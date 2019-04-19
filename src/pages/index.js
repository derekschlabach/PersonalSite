import React from "react"
import Skeleton from "../components/skeleton"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "../styles/react-tabs.css";

export default () => (
	<Skeleton>
		<div>Hello world!</div>
		<Tabs>
			<TabList>
				<Tab> Floor 1 </Tab>
				<Tab> Floor 2 </Tab>
				<Tab> Floor 3 </Tab>
			</TabList>

			<TabPanel>
				<p> Floor 1 </p>
			</TabPanel>
			<TabPanel>
				<p> Floor 2 </p>
			</TabPanel>
			<TabPanel>
				<p> Floor 3 </p>
			</TabPanel>
		</Tabs>
	</Skeleton>
)
