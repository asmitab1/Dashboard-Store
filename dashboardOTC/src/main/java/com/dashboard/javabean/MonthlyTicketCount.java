package com.dashboard.javabean;


public class MonthlyTicketCount {
	public String month;
	public int openTickets;
	public int closedTickets;
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
