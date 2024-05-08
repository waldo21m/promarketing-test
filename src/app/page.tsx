'use client';
import React, { useState } from 'react';
import DepositLimit from '@/components/DepositLimit';
import NavigationBar from '../components/NavigationBar';
import CreateRequest from '../components/CreateRequest';

const Home: React.FC = () => {
	const [activeTab, setActiveTab] = useState(1);

	return (
		<>
			<NavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />

			{activeTab === 1 && <CreateRequest />}

			{activeTab === 2 && <DepositLimit />}
		</>
	);
};

export default Home;
