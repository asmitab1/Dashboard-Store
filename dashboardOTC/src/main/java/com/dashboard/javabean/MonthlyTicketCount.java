package com.dashboard.javabean;


public class MonthlyTicketCount {
	private String team;
	private String month;
	private int openTickets;
	private int closedTickets;
	
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
	
}
