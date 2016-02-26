package com.dashboard.javabean;


public class MonthlyTicketCount {
	private String team;
	private String month;
	private int openTickets;
	private int closedTickets;
	private int injectionRate;
	
	public String getTeam() {
		return team;
	}
	public void setTeam(String team) {
		this.team = team;
	}
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	public int getOpenTickets() {
		return openTickets;
	}
	public void setOpenTickets(int openTickets) {
		this.openTickets = openTickets;
	}
	public int getClosedTickets() {
		return closedTickets;
	}
	public void setClosedTickets(int closedTickets) {
		this.closedTickets = closedTickets;
	}
	/**
	 * @return the injectionRate
	 */
	public int getInjectionRate() {
		return injectionRate;
	}
	/**
	 * @param injectionRate the injectionRate to set
	 */
	public void setInjectionRate(int injectionRate) {
		this.injectionRate = injectionRate;
	}
	
}
