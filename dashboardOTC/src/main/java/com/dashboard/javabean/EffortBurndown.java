package com.dashboard.javabean;

public class EffortBurndown {
	private String team;
	private String week;
	private int pdLeft;
	private int idealpdLeft;
	private int dev;
	public String getWeek() {
		return week;
	}
	public void setWeek(String week) {
		this.week = week;
	}
	public int getPdLeft() {
		return pdLeft;
	}
	public void setPdLeft(int pdLeft) {
		this.pdLeft = pdLeft;
	}
	public int getIdealpdLeft() {
		return idealpdLeft;
	}
	public void setIdealpdLeft(int idealpdLeft) {
		this.idealpdLeft = idealpdLeft;
	}
	public int getDev() {
		return dev;
	}
	public void setDev(int dev) {
		this.dev = dev;
	}
	/**
	 * @return the team
	 */
	public String getTeam() {
		return team;
	}
	/**
	 * @param team the team to set
	 */
	public void setTeam(String team) {
		this.team = team;
	}
	
	
}
