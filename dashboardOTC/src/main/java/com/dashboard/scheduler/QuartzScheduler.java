package com.dashboard.scheduler;

import org.quartz.CronScheduleBuilder;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.quartz.impl.StdSchedulerFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class QuartzScheduler {

	private static final QuartzScheduler quartzScheduler = new QuartzScheduler();
	private static final Logger LOGGER = LoggerFactory
			.getLogger(QuartzScheduler.class);
	private Scheduler scheduler = null;

	public static QuartzScheduler getInstance() {
		return quartzScheduler;
	}

	/**
	 * 
	 */
	public void start() {
		try {
			if (scheduler == null) {
				configureScheduler();
			}
			scheduler.start();			
		} catch (SchedulerException e) {
			LOGGER.info("Failed to start the scheduler due to " + e);
		}
	}

	/**
	 * 
	 */
	public void shutdown() {
		try {
			if (scheduler != null) {
				scheduler.shutdown();
			}
		} catch (Exception e) {
			LOGGER.info("Failed to shutdown the scheduler due to " + e);
		}
	}

	private void configureScheduler() {
		SchedulerFactory factory;
		try {
			factory = new StdSchedulerFactory("quartz.properties");
			scheduler = factory.getScheduler();
		} catch (SchedulerException e) {
			LOGGER.info("Failed to configure the scheduler due to " + e);
		}

	}

	public void scheduleJob(String jobName, String jobGroup,
			String triggerName, String cronExpression, Class jobClass)
			throws SchedulerException {

		JobKey jobKey = new JobKey(jobName, jobGroup);
		JobDetail job = JobBuilder.newJob(jobClass).withIdentity(jobKey)
				.build();

		Trigger trigger = TriggerBuilder.newTrigger()
				.withIdentity(triggerName, jobGroup)
				.withSchedule(CronScheduleBuilder.cronSchedule(cronExpression))
				.build();

		scheduler.scheduleJob(job, trigger);
	}

	public static void main(String[] args) throws SchedulerException {
		QuartzScheduler instance = QuartzScheduler.getInstance();
		instance.start();
		/*instance.scheduleJob("DefectMatrixJob", "GroupJob", "triggerDefectMatrixJob", "0/5 * * * * ?",
				DefectMatrixJob.class);
		
		instance.scheduleJob("BurndownJob", "BurndownJobGroup",
				"BurndownTrigger", "0/5 * * * * ?", BurndownJob.class);*/

	}
}
