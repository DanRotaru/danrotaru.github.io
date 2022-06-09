import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Header from './components/Header';

import About from './pages/About';
import Projects from './pages/Projects';
import Contacts from './pages/Contacts';

import { HashRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<HashRouter>
		<Header />
		<main className="container">
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/about" element={<About />} />
				<Route path="/projects" element={<Projects />} />
				<Route path="/contacts" element={<Contacts />} />
				<Route path="*" element={<App />} />
			</Routes>
		</main>
	</HashRouter>,
);
