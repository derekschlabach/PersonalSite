import React from "react"
import Container from "../components/container"

export default ({ children }) => (
	<div>
		<nav>
			<div> Nav Goes Here </div>
			<a href="https://www.example.com">Go to Example.com</a>
		</nav>

	  <Container>
	    <h1> About CSS Modules </h1>
	    { children }
	  </Container>
  </div>
)
