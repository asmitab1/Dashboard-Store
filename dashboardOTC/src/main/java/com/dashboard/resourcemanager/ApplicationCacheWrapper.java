package com.dashboard.resourcemanager;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;
import net.sf.ehcache.constructs.blocking.BlockingCache;
import net.sf.ehcache.statistics.StatisticsGateway;

import com.google.gson.Gson;

/**
 * This class contains a single cache manager and decoration logic of those
 * caches are mentioned in cache configuration file. A single cache manager can
 * be used to handle the multiple cache.
 * 
 * The cache configuration file name should "CacheConfiguration.xml".
 * 
 * After initializing this class The method shutdownAll() should be called while
 * destroying the process or at the end of the process.
 * 
 * @author Das,Souvik@TCS
 *
 */
public class ApplicationCacheWrapper {

	private static ApplicationCacheWrapper singleInstance;
	/**
	 * Initialize the cache manager. Load all the cache details those are
	 * mentioned in cache configuration file
	 */
	private static final CacheManager cacheManager;
	static {
		/*ClassLoader contextClassLoader = Thread.currentThread()
				.getContextClassLoader();*/
		FileInputStream inputStream = null;
		try {
			inputStream = new FileInputStream(PropertiesCache.getResourcePath()+"\\CacheConfiguration.xml");
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}//contextClassLoader.getResourceAsStream("CacheConfiguration.xml");
		cacheManager = CacheManager.create(inputStream);
	}

	private ApplicationCacheWrapper() {
	}

	public static ApplicationCacheWrapper getCacheWrapperInstance() {

		if (singleInstance == null) {
			// Thread Safe
			synchronized (ApplicationCacheWrapper.class) {
				if (singleInstance == null) {
					singleInstance = new ApplicationCacheWrapper();
				}
			}
		}

		return singleInstance;
	}
	
	/**
	 * Get cache details from cache manager
	 * 
	 * @param cacheName
	 * @return
	 */
	private BlockingCache getCache(String cacheName) {
		BlockingCache cache = new BlockingCache(cacheManager.getEhcache(cacheName));
		return cache;
	}

	/**
	 * Add or update any object in cache memory against an in-memory id. Pass
	 * the cache name which needs to be accessed. Cache name should be
	 * configured in cache configuration file.
	 * 
	 * @param cacheName
	 * @param inMemoryId
	 * @param inMemoryObject
	 */
	public void saveToCache(String cacheName, Object inMemoryId,
			Object inMemoryObject) {
		getCache(cacheName).put(new Element(inMemoryId, inMemoryObject));
	}

	/**
	 * Get in-memory object against an in-memory id. Pass the cache name which
	 * needs to be accessed. Cache name should be configured in cache
	 * configuration file.
	 * 
	 * @param cacheName
	 * @param inMemoryId
	 * @return Object
	 */
	public synchronized Object getCachedObjectById(String cacheName,
			Object inMemoryId) {
		BlockingCache cache = getCache(cacheName);
		Element element = cache.get(inMemoryId);
		Object objectValue = (element != null)? element.getObjectValue() : null;
		return objectValue;
	}

	/**
	 * Get the collection of in-memory id for passed cache name.
	 * 
	 * @param cacheName
	 * @return a List of String object
	 */
	@SuppressWarnings("unchecked")
	public List<String> getCacheKeys(String cacheName) {
		return getCache(cacheName).getKeys();
	}

	/**
	 * Get the total size of cache
	 * 
	 * @param cacheName
	 * @return
	 */
	public int getCacheTotalSize(String cacheName) {
		return getCache(cacheName).getSize();
	}

	/**
	 * Get the configured in-memory size of cache
	 * 
	 * @param cacheName
	 * @return
	 */
	public long getCacheInMemorySize(String cacheName) {
		return getCache(cacheName).getCacheConfiguration()
				.getMaxEntriesLocalHeap();
	}

	/**
	 * Remove single record from cache against the passed in-memory id
	 * 
	 * @param cacheName
	 */
	public void removeFromCache(String cacheName, Object inMemoryId) {
		getCache(cacheName).remove(inMemoryId);
	}

	/**
	 * Remove all records from the cache but this method does not remove the
	 * cache from cache manager. To close the cache
	 * "closeCache(String argument)" method should be called.
	 * 
	 * @param cacheName
	 */
	public void removeAllFromCache(String cacheName) {
		getCache(cacheName).removeAll();
	}

	/**
	 * Flush all information from mentioned cache
	 * 
	 * @param cacheName
	 */
	public void flushCache(String cacheName) {
		getCache(cacheName).flush();
	}

	/**
	 * Close the mention cache from the cache manager. This method flushes
	 * 
	 * @param cacheName
	 */
	public void closeCache(String cacheName) {
		flushCache(cacheName);
		removeAllFromCache(cacheName);
		cacheManager.removeCache(cacheName);
	}

	/**
	 * Clear all the records from cache. Shutdown all the cache from cache
	 * manager and then shutdown main cache manager.
	 * 
	 * @param cacheName
	 */
	public void shutdownAll() {
		for (String cacheName : cacheManager.getCacheNames()) {
			flushCache(cacheName);
			removeAllFromCache(cacheName);
			cacheManager.removeCache(cacheName);
		}
		shutdownCacheManager();
	}

	/**
	 * Shutdown the main cache manager
	 */
	public void shutdownCacheManager() {
		cacheManager.shutdown();
	}

	public String getCacheStatistics() {
		List<Map<String, Object>> cacheStatisticsList = new ArrayList<Map<String,Object>>();
		String[] cacheNames = cacheManager.getCacheNames();
		for (String cacheName : cacheNames) {
			Cache cache = cacheManager.getCache(cacheName);			
			if(cache != null){
				StatisticsGateway statistics = cache.getStatistics();
				if(statistics != null){
					Map<String, Object> cacheStatistics = new HashMap<String, Object>();
					cacheStatistics.put("cacheName", cacheName);
					cacheStatistics.put("cacheEvictedCount", statistics.cacheEvictedCount());
					cacheStatistics.put("cacheExpiredCount", statistics.cacheExpiredCount());
					cacheStatistics.put("cacheHitCount", statistics.cacheHitCount());
					cacheStatistics.put("localHeapSize", statistics.getLocalHeapSize());
					cacheStatisticsList.add(cacheStatistics);
				}
			}
		}
		return new Gson().toJson(cacheStatisticsList);
	}
}
