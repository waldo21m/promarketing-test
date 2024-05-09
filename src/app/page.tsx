'use client';
import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import DepositLimit from '../components/DepositLimit';
import CreateRequest from '../components/CreateRequest';

const Home: React.FC = () => {
	const [activeTab, setActiveTab] = useState(2);

	return (
		<>
			<NavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />

			{activeTab === 1 && <CreateRequest />}

			{activeTab === 2 && <DepositLimit />}
		</>
	);
};

export default Home;
