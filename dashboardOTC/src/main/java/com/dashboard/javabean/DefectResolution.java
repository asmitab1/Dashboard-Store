package com.dashboard.javabean;

public class DefectResolution {
	
	private String team;
	private String ticketNumber;
	private String issueDescription;
	private String rootCause;
	private String resolution;
	private String mitigatedRiskOpportunity;
	public String getTeam() {
		return team;
	}
	public void setTeam(String team) {
		this.team = team;
	}
	public String getTicketNumber() {
		return ticketNumber;
	}
	public String getRootCause() {
		return rootCause;
	}
	public void setRootCause(String rootCause) {
		this.rootCause = rootCause;
	}
	public void setTicketNumber(String ticketNumber) {
		this.ticketNumber = ticketNumber;
	}
	public String getIssueDescription() {
		return issueDescription;
	}
	public void setIssueDescription(String issueDescription) {
		this.issueDescription = issueDescription;
	}
	public String getResolution() {
		return resolution;
	}
	public void setResolution(String resolution) {
		this.resolution = resolution;
	}
	public String getMitigatedRiskOpportunity() {
		return mitigatedRiskOpportunity;
	}
	public void setMitigatedRiskOpportunity(String mitigatedRiskOpportunity) {
		this.mitigatedRiskOpportunity = mitigatedRiskOpportunity;
	}
	
}
