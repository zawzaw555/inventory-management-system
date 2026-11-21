import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('Loading...')
  const [error, setError] = useState('')
  
  useEffect(() => {
	fetch('/api/hello')
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP ${response.status}`)
			}
			return response.text()
		})
		.then((data) => setMessage(data))
		.catch((err) => {
			setError(err.message)
		})
  }, [])
  
  return (
	<main>
		<h1>Inventory Management System</h1>
		<h2>React + Spring Boot + MySQL</h2>
		
		<p>Backend API Response:</p>
		
		{error ? (
			<p style={{ color: 'red' }}>Error: {error}</p>
		) : (
			<p>{message}</p>
		)}
	</main>
  )
}

export default App
