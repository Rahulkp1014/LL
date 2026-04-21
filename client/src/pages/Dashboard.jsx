import React from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  DollarSign 
} from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, change, icon, color }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card stat-card"
  >
    <div className="stat-header">
      <div className="stat-info">
        <p className="stat-title">{title}</p>
        <h3 className="stat-value">{value}</h3>
      </div>
      <div className={`stat-icon ${color}`}>
        {icon}
      </div>
    </div>
    <div className="stat-footer">
      <span className={`stat-change ${parseFloat(change) >= 0 ? 'positive' : 'negative'}`}>
        {change}%
      </span>
      <span className="stat-period">vs last 7 days</span>
    </div>

    <style dangerouslySetInnerHTML={{ __html: `
      .stat-card {
        padding: 1.5rem;
        flex: 1;
        min-width: 240px;
      }

      .stat-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;
      }

      .stat-title {
        color: var(--text-secondary);
        font-size: 0.85rem;
        font-weight: 500;
        margin-bottom: 0.25rem;
      }

      .stat-value {
        font-size: 1.5rem;
        color: var(--text-primary);
      }

      .stat-icon {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .stat-icon.green { background-color: #e3f1df; color: #008060; }
      .stat-icon.blue { background-color: #e0f2fe; color: #0ea5e9; }
      .stat-icon.purple { background-color: #f3e8ff; color: #a855f7; }
      .stat-icon.orange { background-color: #ffedd5; color: #f97316; }

      .stat-footer {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.8rem;
      }

      .stat-change {
        font-weight: 600;
      }

      .stat-change.positive { color: #008060; }
      .stat-change.negative { color: #d82c0d; }

      .stat-period {
        color: var(--text-secondary);
      }
    `}} />
  </motion.div>
);

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <div className="header-actions">
          <button className="btn btn-secondary">Export</button>
          <button className="btn btn-primary">Create Order</button>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard 
          title="Total Revenue" 
          value="$12,840.00" 
          change="+12.5" 
          icon={<DollarSign size={20} />} 
          color="green"
        />
        <StatCard 
          title="Total Orders" 
          value="156" 
          change="+5.2" 
          icon={<ShoppingBag size={20} />} 
          color="blue"
        />
        <StatCard 
          title="Customers" 
          value="1,204" 
          change="+8.1" 
          icon={<Users size={20} />} 
          color="purple"
        />
        <StatCard 
          title="Growth" 
          value="24.8%" 
          change="+2.4" 
          icon={<TrendingUp size={20} />} 
          color="orange"
        />
      </div>

      <div className="dashboard-grid">
        <div className="glass-card chart-container">
          <h3>Revenue Overview</h3>
          <div className="placeholder-chart">
            {/* Chart would go here */}
            <p>Chart Visualization Placeholder</p>
          </div>
        </div>
        
        <div className="glass-card recent-activity">
          <h3>Recent Orders</h3>
          <div className="activity-list">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="activity-item">
                <div className="activity-info">
                  <p className="order-id">#102{i}</p>
                  <p className="order-customer">Rahul Kumar</p>
                </div>
                <div className="order-status status-paid">Paid</div>
                <div className="order-amount">$450.00</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }

        .chart-container, .recent-activity {
          padding: 1.5rem;
          min-height: 400px;
        }

        .chart-container h3, .recent-activity h3 {
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
        }

        .placeholder-chart {
          height: 300px;
          background-color: #f9fafb;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          border: 2px dashed var(--border);
        }

        .activity-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 0;
          border-bottom: 1px solid var(--border);
        }

        .activity-item:last-child {
          border-bottom: none;
        }

        .order-id {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .order-customer {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .order-status {
          font-size: 0.75rem;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-weight: 600;
        }

        .status-paid { background-color: #e3f1df; color: #008060; }

        .order-amount {
          font-weight: 500;
          font-size: 0.9rem;
        }
      `}} />
    </div>
  );
};

export default Dashboard;
