import React, { useState } from 'react';
import Tabs from '../../../components/tabs';
import CounterList from './counter-list';
import TicketList from './ticket-list';
/**
 * Component TabList - Quản lý 2 tab: Danh sách quầy và Danh sách bốc số
 */
function TabList() {
  const [activeTab, setActiveTab] = useState(0);

  // Định nghĩa các tab
  const tabs = [
    {
      name: 'Danh sách quầy',
      content: CounterList
    },
    {
      name: 'Theo dõi bốc số', 
      content: TicketList
    }
  ];

  return (
    <div className="h-screen">
      <Tabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={tabs}
      />
    </div>
  );
}

export default TabList;