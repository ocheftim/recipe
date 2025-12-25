// src/pages/Dashboard.js - Updated with Correct GlobalStyles Imports
import React, { useState } from 'react';

// Direct imports from globalStyles - no more destructuring from STYLES
import {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  CARDS,
  BUTTONS,
  PAGE_CONTAINER,
  PAGE_HEADER,
  UTILS,
  ANIMATIONS,
  combineStyles,
  getStatusColor
} from '../styles/globalStyles';

// Define PROGRESS locally since it doesn't exist in globalStyles
const PROGRESS = {
  bar: {
    width: '100%',
    height: '8px',
    backgroundColor: COLORS.lightBackground,
    borderRadius: '4px',
    overflow: 'hidden'
  },
  fill: {
    height: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  }
};

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState('daily');

  // Restaurant Management Goals & Priorities
  const todaysPriorities = [
    { id: 1, task: 'Menu Cost Analysis Review', priority: 'high', time: '9:00 AM', status: 'pending' },
    { id: 2, task: 'Inventory Stock Check', priority: 'high', time: '11:00 AM', status: 'pending' },
    { id: 3, task: 'Recipe Standardization Meeting', priority: 'medium', time: '2:00 PM', status: 'pending' },
    { id: 4, task: 'Supplier Contract Review', priority: 'medium', time: '4:00 PM', status: 'pending' },
    { id: 5, task: 'Staff Training Schedule', priority: 'low', time: '5:00 PM', status: 'pending' }
  ];

  const weeklyGoals = [
    { goal: 'Reduce food cost by 2%', progress: 65, target: 'Friday' },
    { goal: 'Complete recipe book updates', progress: 40, target: 'Thursday' },
    { goal: 'Inventory optimization audit', progress: 80, target: 'Wednesday' }
  ];

  const monthlyGoals = [
    { goal: 'Launch new seasonal menu', progress: 25, daysLeft: 18 },
    { goal: 'Implement cost tracking system', progress: 75, daysLeft: 12 },
    { goal: 'Staff productivity training', progress: 50, daysLeft: 20 }
  ];

  const quarterlyGoals = [
    { period: '30 Day', goal: 'Menu engineering implementation', progress: 60 },
    { period: '60 Day', goal: 'Supplier relationship optimization', progress: 35 },
    { period: '90 Day', goal: 'Digital kitchen transformation', progress: 20 }
  ];

  // Quick Stats
  const stats = [
    { title: 'Food Cost %', value: '28.5%', trend: 'down', change: '-1.2%', color: COLORS.accent },
    { title: 'Recipe Count', value: '247', trend: 'up', change: '+12', color: COLORS.accent },
    { title: 'Ingredients', value: '156', trend: 'up', change: '+8', color: COLORS.accent },
    { title: 'Menu Items', value: '89', trend: 'stable', change: '0', color: COLORS.accent }
  ];

  // Date Navigation
  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return COLORS.error;
      case 'medium': return COLORS.warning; 
      case 'low': return COLORS.accent;
      default: return COLORS.secondary;
    }
  };

  // Local styles for unique dashboard components
  const localStyles = {
    container: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: COLORS.lightBackground
    },
    header: {
      ...PAGE_HEADER.container,
      borderBottom: `1px solid ${COLORS.border}`,
      padding: `${SPACING.lg} ${SPACING.xl}`
    },
    headerTitle: {
      fontSize: TYPOGRAPHY.fontSize.xl,
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      color: COLORS.primary,
      marginBottom: SPACING.xs
    },
    headerSubtitle: {
      fontSize: TYPOGRAPHY.fontSize.md,
      color: COLORS.secondary,
      marginTop: SPACING.xs
    },
    viewSelector: {
      display: 'flex',
      backgroundColor: COLORS.subtleBorder,
      borderRadius: SPACING.sm,
      padding: SPACING.xs
    },
    viewButton: {
      padding: `${SPACING.sm} ${SPACING.lg}`,
      borderRadius: SPACING.sm,
      fontSize: TYPOGRAPHY.fontSize.sm,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      transition: ANIMATIONS.transition.base,
      border: 'none',
      cursor: 'pointer'
    },
    viewButtonActive: {
      backgroundColor: COLORS.background,
      color: COLORS.primary,
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
    },
    viewButtonInactive: {
      backgroundColor: 'transparent',
      color: COLORS.secondary
    },
    mainContent: {
      flex: 1,
      padding: SPACING.xl
    },
    maxContainer: {
      maxWidth: '1280px',
      margin: '0 auto',
      width: '100%'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: SPACING.xl,
      marginBottom: SPACING.xl
    },
    statCard: {
      ...CARDS.container,
      padding: SPACING.xl,
      position: 'relative'
    },
    statTitle: {
      fontSize: TYPOGRAPHY.fontSize.xs,
      textTransform: 'uppercase',
      letterSpacing: TYPOGRAPHY.letterSpacing.widest,
      color: COLORS.secondary,
      marginBottom: SPACING.xs
    },
    statValue: {
      fontSize: TYPOGRAPHY.fontSize.xxl,
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      color: COLORS.primary,
      marginTop: SPACING.xs
    },
    statChange: {
      fontSize: TYPOGRAPHY.fontSize.xs,
      marginTop: SPACING.xs
    },
    dashboardGrid: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: SPACING.xl
    },
    taskItem: {
      display: 'flex',
      alignItems: 'center',
      gap: SPACING.lg,
      padding: SPACING.md,
      borderRadius: SPACING.sm,
      border: `1px solid ${COLORS.subtleBorder}`,
      transition: ANIMATIONS.transition.fast,
      cursor: 'pointer'
    },
    taskItemHover: {
      backgroundColor: COLORS.lightBackground
    },
    priorityDot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      flexShrink: 0
    },
    taskContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: SPACING.xs
    },
    taskHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    taskName: {
      fontSize: TYPOGRAPHY.fontSize.base,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      color: COLORS.primary
    },
    taskTime: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      color: COLORS.secondary
    },
    priorityBadge: {
      display: 'inline-block',
      fontSize: TYPOGRAPHY.fontSize.xs,
      padding: `2px ${SPACING.sm}`,
      borderRadius: '9999px',
      color: COLORS.background,
      textTransform: 'uppercase',
      fontWeight: TYPOGRAPHY.fontWeight.medium
    },
    progressContainer: {
      marginBottom: SPACING.lg
    },
    progressHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: SPACING.sm
    },
    progressLabel: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      color: COLORS.primary
    },
    progressTarget: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      color: COLORS.secondary
    },
    progressBar: {
      ...PROGRESS.bar,
      marginBottom: SPACING.xs
    },
    progressFill: {
      ...PROGRESS.fill,
      backgroundColor: COLORS.accent
    },
    progressText: {
      fontSize: TYPOGRAPHY.fontSize.xs,
      color: COLORS.secondary
    },
    sectionCard: {
      ...CARDS.container,
      padding: SPACING.xl,
      borderLeft: `4px solid ${COLORS.accent}`,
      marginBottom: SPACING.xl
    },
    sectionTitle: {
      fontSize: TYPOGRAPHY.fontSize.lg,
      fontWeight: TYPOGRAPHY.fontWeight.semibold,
      color: COLORS.primary,
      marginBottom: SPACING.lg
    },
    dateNav: {
      display: 'flex',
      alignItems: 'center',
      gap: SPACING.md
    },
    navButton: {
      ...BUTTONS.ghost,
      padding: SPACING.sm,
      borderRadius: SPACING.sm,
      fontSize: TYPOGRAPHY.fontSize.lg
    },
    dateText: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      color: COLORS.secondary,
      padding: `0 ${SPACING.lg}`
    },
    goalItem: {
      borderBottom: `1px solid ${COLORS.subtleBorder}`,
      paddingBottom: SPACING.md,
      marginBottom: SPACING.md
    },
    goalItemLast: {
      borderBottom: 'none',
      marginBottom: 0,
      paddingBottom: 0
    },
    periodLabel: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      fontWeight: TYPOGRAPHY.fontWeight.bold,
      color: COLORS.accent
    },
    quickActionButton: {
      ...BUTTONS.base,
      width: '100%',
      textAlign: 'left',
      padding: SPACING.md,
      marginBottom: SPACING.md,
      display: 'block',
      borderColor: COLORS.border
    },
    quickActionTitle: {
      fontSize: TYPOGRAPHY.fontSize.sm,
      fontWeight: TYPOGRAPHY.fontWeight.medium,
      color: COLORS.primary,
      marginBottom: SPACING.xs
    },
    quickActionDesc: {
      fontSize: TYPOGRAPHY.fontSize.xs,
      color: COLORS.secondary
    }
  };

  return (
    <div style={localStyles.container}>
      {/* Header */}
      <header style={localStyles.header}>
        <div style={UTILS.flexBetween}>
          <div>
            <h1 style={localStyles.headerTitle}>Restaurant Operations Planner</h1>
            <p style={localStyles.headerSubtitle}>Strategic planning and daily operations management</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.lg }}>
            <div style={localStyles.viewSelector}>
              {['daily', 'weekly', 'monthly'].map((view) => (
                <button
                  key={view}
                  onClick={() => setSelectedView(view)}
                  style={combineStyles(
                    localStyles.viewButton,
                    selectedView === view ? localStyles.viewButtonActive : localStyles.viewButtonInactive
                  )}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={localStyles.mainContent}>
        <div style={localStyles.maxContainer}>
          {/* Quick Stats Row */}
          <div style={localStyles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} style={{...localStyles.statCard, borderLeft: `4px solid ${stat.color}`}}>
                <div style={UTILS.flexBetween}>
                  <div>
                    <p style={localStyles.statTitle}>{stat.title}</p>
                    <p style={localStyles.statValue}>{stat.value}</p>
                    <p style={{
                      ...localStyles.statChange,
                      color: stat.trend === 'up' || stat.trend === 'down' ? COLORS.success : COLORS.secondary
                    }}>
                      {stat.change} from last week
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Dashboard Grid */}
          <div style={localStyles.dashboardGrid}>
            
            {/* Today's Schedule & Priorities */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.xl }}>
              
              {/* Date Navigation */}
              <div style={localStyles.sectionCard}>
                <div style={{...UTILS.flexBetween, marginBottom: SPACING.lg}}>
                  <h2 style={localStyles.sectionTitle}>Today's Operations</h2>
                  <div style={localStyles.dateNav}>
                    <button 
                      onClick={() => navigateDate('prev')}
                      style={localStyles.navButton}
                    >
                      ←
                    </button>
                    <span style={localStyles.dateText}>
                      {formatDate(currentDate)}
                    </span>
                    <button 
                      onClick={() => navigateDate('next')}
                      style={localStyles.navButton}
                    >
                      →
                    </button>
                  </div>
                </div>

                {/* Priority Tasks */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.md }}>
                  {todaysPriorities.map((item) => (
                    <div key={item.id} 
                         style={localStyles.taskItem}
                         onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.lightBackground}
                         onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <div style={{...localStyles.priorityDot, backgroundColor: getPriorityColor(item.priority)}}></div>
                      <div style={localStyles.taskContent}>
                        <div style={localStyles.taskHeader}>
                          <span style={localStyles.taskName}>{item.task}</span>
                          <span style={localStyles.taskTime}>{item.time}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.sm }}>
                          <span style={{
                            ...localStyles.priorityBadge,
                            backgroundColor: getPriorityColor(item.priority)
                          }}>
                            {item.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Goals Progress */}
              <div style={localStyles.sectionCard}>
                <h3 style={localStyles.sectionTitle}>This Week's Goals</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.lg }}>
                  {weeklyGoals.map((goal, index) => (
                    <div key={index} style={localStyles.progressContainer}>
                      <div style={localStyles.progressHeader}>
                        <span style={localStyles.progressLabel}>{goal.goal}</span>
                        <span style={localStyles.progressTarget}>Target: {goal.target}</span>
                      </div>
                      <div style={localStyles.progressBar}>
                        <div style={{
                          ...localStyles.progressFill,
                          width: `${goal.progress}%`
                        }}></div>
                      </div>
                      <div style={localStyles.progressText}>{goal.progress}% complete</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Goals & Planning */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.xl }}>
              
              {/* Monthly Goals */}
              <div style={localStyles.sectionCard}>
                <h3 style={localStyles.sectionTitle}>Monthly Objectives</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.lg }}>
                  {monthlyGoals.map((goal, index) => (
                    <div key={index} style={index < monthlyGoals.length - 1 ? localStyles.goalItem : localStyles.goalItemLast}>
                      <div style={{...localStyles.progressHeader, marginBottom: SPACING.sm}}>
                        <span style={localStyles.progressLabel}>{goal.goal}</span>
                        <span style={{...localStyles.progressText, fontSize: TYPOGRAPHY.fontSize.xs}}>{goal.daysLeft} days left</span>
                      </div>
                      <div style={{...localStyles.progressBar, height: '6px'}}>
                        <div style={{
                          ...localStyles.progressFill,
                          width: `${goal.progress}%`,
                          height: '6px'
                        }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quarterly Planning */}
              <div style={localStyles.sectionCard}>
                <h3 style={localStyles.sectionTitle}>Strategic Planning</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.lg }}>
                  {quarterlyGoals.map((goal, index) => (
                    <div key={index} style={localStyles.progressContainer}>
                      <div style={localStyles.progressHeader}>
                        <span style={localStyles.periodLabel}>{goal.period}</span>
                        <span style={localStyles.progressText}>{goal.progress}%</span>
                      </div>
                      <p style={{fontSize: TYPOGRAPHY.fontSize.sm, marginBottom: SPACING.sm}}>
                        {goal.goal}
                      </p>
                      <div style={{...localStyles.progressBar, height: '6px'}}>
                        <div style={{
                          ...localStyles.progressFill,
                          width: `${goal.progress}%`,
                          height: '6px'
                        }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div style={localStyles.sectionCard}>
                <h3 style={localStyles.sectionTitle}>Quick Actions</h3>
                <div>
                  <button style={localStyles.quickActionButton}>
                    <div style={localStyles.quickActionTitle}>Add New Recipe</div>
                    <div style={localStyles.quickActionDesc}>Create and cost new menu item</div>
                  </button>
                  <button style={localStyles.quickActionButton}>
                    <div style={localStyles.quickActionTitle}>Update Inventory</div>
                    <div style={localStyles.quickActionDesc}>Record stock levels and orders</div>
                  </button>
                  <button style={{...localStyles.quickActionButton, marginBottom: 0}}>
                    <div style={localStyles.quickActionTitle}>Cost Analysis</div>
                    <div style={localStyles.quickActionDesc}>Review recipe profitability</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;