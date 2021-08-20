import React, {Component} from 'react'
import Container from '@material-ui/core/Container'
import {NavBar} from "./components/NavBar/NavBar"

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      isLoading: true,
      sorted: false,
    }
  }

  async componentDidMount() {
    let users = localStorage.getItem('users')
    try {
      users = JSON.parse(users);
    } catch (err) {
      console.log('Users was not found')
    }
    if (!Array.isArray(users) || !users.length) {
      users = await fetch('https://demo.sibers.com/users')
        .then(response => response.json())
      localStorage.setItem('users', JSON.stringify(users))
    }
    this.setState(state => ({
      ...state,
      users,
      isLoading: false,
    }))
  }

  render() {
    return (
      <Container>
        <NavBar />
      </Container>
    )
  }
}

