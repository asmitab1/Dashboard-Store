package com.dashboard.resourcemanager;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Properties;
import java.util.Set;

public class PropertiesCache {

	private static String resourcePath ;
	
	public static String getResourcePath() {
		if (resourcePath == null){
			URL url = PropertiesCache.class.getClassLoader()
					.getResource("ApplicationResources.properties");
			
			String path = url.getPath();
			resourcePath = path.substring(0,path.indexOf("WEB-INF/classes")+15);
		}
		return resourcePath;
	}

	
	private PropertiesCache() {
		// Private constructor to restrict new instances
		InputStream in = this.getClass().getClassLoader()
				.getResourceAsStream("ApplicationResources.properties");
		URL url = this.getClass().getClassLoader()
				.getResource("ApplicationResources.properties");
		
		String path = url.getPath();
		resourcePath = path.substring(0,path.indexOf("WEB-INF/classes")+15);
		System.out.println("Read all properties from file" + url.getPath());
		try {
			configProp.load(in);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private final Properties configProp = new Properties();

	private static class LazyHolder {
		private static final PropertiesCache INSTANCE = new PropertiesCache();
	}

	public static PropertiesCache getInstance() {
		return LazyHolder.INSTANCE;
	}

	public String getProperty(String key) {
		return configProp.getProperty(key);
	}

	public Set<String> getAllPropertyNames() {
		return configProp.stringPropertyNames();
	}

	public boolean containsKey(String key) {
		return configProp.containsKey(key);
	}

}
