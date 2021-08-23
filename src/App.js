import React, { Component } from 'react'
import Container from '@material-ui/core/Container'
import {NavBar} from "./components/NavBar/NavBar"
import {UserList} from "./components/UserList/UserList"
import DataChangeModal from "./components/DataChangeModal/DataChangeModal"

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      isLoading: true,
      sorted: false,
      value: '',
      modalActive: false,
      modalUserData: {}
    }
  }

  toggleModal = () => {
    this.setState(state => ({
      ...state,
      modalActive: !this.state.modalActive
    }))
  }

  setModalActive = (user) => {
    this.setState((state) => ({
      ...state,
      modalUserData: user,
    }))
    this.toggleModal()
  }

  saveUserData = (changedUser) => {
    let { users } = this.state;
    users = users.map((user) => {
      if (user.id === changedUser.id) {
        return changedUser
      }
      return user;
    });

    this.setState((state) => ({
      ...state,
      users,
      modalActive: false,
    }));

    this.saveUsersInLocalStorage(users);
  }

  saveUsersInLocalStorage(users) {
    return localStorage.setItem('users', JSON.stringify(users));
  }

  searchFilter = (e) => {
    this.setState(state => ({
      ...state,
      value: e.target.value
    }))
  }

  async componentDidMount() {
    let users = localStorage.getItem('users')
    try {
      users = JSON.parse(users)
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

  filterAlphabetically = () => {
    let { users } = this.state
    if (Array.isArray(users) && !!users.length) {
      if (this.state.sorted) {
        users.reverse()
      } else {
        users.sort((a, b) => {
          return a.name.localeCompare(b.name)
        })
      }
      this.setState(state => ({
        ...state,
        users,
        sorted: true,
      }))
    }
  }

  render() {
    const { isLoading, users, modalActive } = this.state

    const filterUsers = users.filter(user => {
      return user.name.toLowerCase().includes(this.state.value.toLowerCase())
    })

    return (
      <Container>
        {
          isLoading
          ?
            <p>Loading</p>
            :
            <div>
              <NavBar
                searchFilter={this.searchFilter}
                filterAlphabetically={this.filterAlphabetically}
              />
              <UserList
                users={filterUsers}
                setModalActive={this.setModalActive}
                modalActive={this.state.modalActive}
              />
              {modalActive ? <DataChangeModal
                modalActive={this.state.modalActive}
                setModalActive={this.setModalActive}
                modalUserData={this.state.modalUserData}
                changeUserDataState={this.saveUserData}
                isLoading={this.state.isLoading}
                toggleModal={this.toggleModal}
              /> : null}
            </div>
        }
      </Container>
    )
  }
}

