package com.dashboard.javabean;

public class ResourceWorkload {
	String Team;
	String Analyst;
	int Urgent;
	int High;
	int Medium;
	int Low;
	int urgentLag;
	int highLag; 
	public int getUrgentLag() {
		return urgentLag;
	}
	public void setUrgentLag(int urgentLag) {
		this.urgentLag = urgentLag;
	}
	public int getHighLag() {
		return highLag;
	}
	public void setHighLag(int highLag) {
		this.highLag = highLag;
	}
	public String getTeam() {
		return Team;
	}
	public void setTeam(String team) {
		Team = team;
	}
	public String getAnalyst() {
		return Analyst;
	}
	public void setAnalyst(String analyst) {
		Analyst = analyst;
	}
	public int getUrgent() {
		return Urgent;
	}
	public void setUrgent(int urgent) {
		Urgent = urgent;
	}
	public int getHigh() {
		return High;
	}
	public void setHigh(int high) {
		High = high;
	}
	public int getMedium() {
		return Medium;
	}
	public void setMedium(int medium) {
		Medium = medium;
	}
	public int getLow() {
		return Low;
	}
	public void setLow(int low) {
		Low = low;
	}
	
	
}
