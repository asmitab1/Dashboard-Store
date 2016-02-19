package com.dashboard;

import javax.servlet.ServletContextEvent;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.dashboard.scheduler.job.StoryAssignmentJob;

public class StartupListener implements javax.servlet.ServletContextListener {

	public void contextDestroyed(ServletContextEvent arg0) {
	}

	public void contextInitialized(ServletContextEvent arg0) {
		System.out.println("StartupListener started");
	}
}
