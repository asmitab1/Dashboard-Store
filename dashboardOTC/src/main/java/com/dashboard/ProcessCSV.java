package com.dashboard;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.dashboard.javabean.MonthlyTicketCount;
import com.dashboard.javabean.ProgramStatistics;
import com.fasterxml.jackson.core.JsonProcessingException;
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

	/**
	 * @param args
	 * @throws IOException 
	 * @throws JsonProcessingException 
	 */
	
	public static void main(String args[]){
		ProcessCSV proc = new ProcessCSV();
		try{
			MonthlyTicketCount MonthlyTicketCount = new MonthlyTicketCount();
			//List<Object> MonthlyTicketCountList = proc.execute(MonthlyTicketCount);
			ProgramStatistics ProgramStatistics = new ProgramStatistics();
			List<Object> ProgramStatisticsList = proc.execute(ProgramStatistics);
			for(Object programStatisticsRows : ProgramStatisticsList){
				System.out.println("NEW ROW");
				System.out.println(((ProgramStatistics) programStatisticsRows).getTeam());
				System.out.println(((ProgramStatistics) programStatisticsRows).getProgramName());
				System.out.println(((ProgramStatistics) programStatisticsRows).getWeight());
				
				System.out.println(((ProgramStatistics) programStatisticsRows).getActualTime());
				System.out.println(((ProgramStatistics) programStatisticsRows).getTargetTime());
			}
			/*for(Object ticketCountRows : MonthlyTicketCountList){
				System.out.println("NEW ROW");
				System.out.println(((MonthlyTicketCount) ticketCountRows).getMonth());
				System.out.println(((MonthlyTicketCount) ticketCountRows).getOpenTickets());
				System.out.println(((MonthlyTicketCount) ticketCountRows).getClosedTickets());
			}*/
		}
		catch(Exception ex){
			System.out.println(ex);
		}
		
		
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	private List<Object> execute(Object obj) throws JsonProcessingException, IOException{
		List CSVRows = new ArrayList();
		CsvMapper mapper = new CsvMapper();
		String objName = obj.getClass().getName();
		System.out.println(objName);
		File csvFile = new File("Resources/"+objName+".csv");
		CsvSchema schema = CsvSchema.emptySchema().withHeader().withColumnSeparator(',');
		com.fasterxml.jackson.databind.MappingIterator<Object> it =  mapper.reader(obj.getClass()).with(schema).readValues(csvFile);
		while (it.hasNext()){
			Object row = it.next();
			CSVRows.add(row);
		}
		return CSVRows;
	}
}
