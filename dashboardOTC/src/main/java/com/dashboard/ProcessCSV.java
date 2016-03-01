package com.dashboard;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.JsonProcessingException;

import com.dashboard.javabean.MonthlyTicketCount;
import com.dashboard.javabean.ProgramStatistics;
import com.dashboard.resourcemanager.PropertiesCache;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;


/**
 * 
 */

/**
 * @author Atrayee
 *
 */
public class ProcessCSV {
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static List<Object>  execute(String fileName, Object obj) throws JsonProcessingException, IOException{
		List CSVRows = new ArrayList();
		List CSVRowsException = new ArrayList();
		List CSVRowsLock = new ArrayList();
		CsvMapper mapper = new CsvMapper();
		String filePath  = PropertiesCache.getInstance()
				.getProperty("FTP_LOCATION") + fileName;
		
		File f = new File(filePath+"rajat.lock");
		if(f.exists()){
			System.out.println("Lock found in Processing: " + fileName);
			CSVRowsLock = executeFileException(fileName, obj);
			return CSVRowsLock;
		}
		else{
			try{
				String sourceLocation = filePath;
				String destLocation = "/temp/"+ fileName;
				FileUtils.copyFile(sourceLocation, destLocation);
				File csvFile = new File(destLocation);
				CsvSchema schema = CsvSchema.emptySchema().withHeader().withColumnSeparator(',');
				com.fasterxml.jackson.databind.MappingIterator<Object> it =  mapper.reader(obj.getClass()).with(schema).readValues(csvFile);
				while (it.hasNext()){
					Object row = it.next();
					CSVRows.add(row);
				}
				return CSVRows;
			}
			catch(Exception ex){
				System.out.println("Exception in File Processing: " + fileName + " ," + ex.getMessage());
				CSVRowsException = executeFileException(fileName, obj);
				return CSVRowsException;
			}
		}
	}
	
	@SuppressWarnings("unchecked")
	public static List<Object>  executeFileException(String fileName, Object obj) throws JsonProcessingException, IOException{
		List CSVRows = new ArrayList();
		CsvMapper mapper = new CsvMapper();
		
		URL url = ProcessCSV.class.getClassLoader()
				.getResource(fileName);

		String localFilePath = url.getPath();
		File csvFile = new File(localFilePath);
		CsvSchema schema = CsvSchema.emptySchema().withHeader().withColumnSeparator(',');
		com.fasterxml.jackson.databind.MappingIterator<Object> it =  mapper.reader(obj.getClass()).with(schema).readValues(csvFile);
		while (it.hasNext()){
			Object row = it.next();
			CSVRows.add(row);
		}
		return CSVRows;
	}
}
