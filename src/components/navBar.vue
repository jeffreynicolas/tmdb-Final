<template>
    <header>
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/filmes">Filmes</router-link></li>
          <li><router-link to="/tv">series</router-link></li>
        </ul>
      </nav>
    </header>
  </template>
  
  <style scoped>
  header {
      background-color: #2c3e50; 
      color: #ffffff; 
      padding: 1rem;
      text-align: center;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); 
  }
  
  nav ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: center;
  }
  
  nav li {
      margin: 0 15px;
  }
  
  nav a {
      color: #ffffff;
      text-decoration: none;
      font-size: 1.2rem;
  }
  

  </style>
  