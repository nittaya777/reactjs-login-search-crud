import React, { Component } from "react";
import { setApp } from "./actions/app.action";

import Home from "./components/Home";
import { Sale,OrderInfo } from "./components/Sale";
import Login from "./components/Login";
import { Users, UserCreate, UserInfo } from "./components/User";
import { Profile } from "./components/Profile";
import Page404 from "./Page404"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import { Container } from "reactstrap";

import { server, YES } from "./Constants";
import { connect } from "react-redux";

const isLoggedIn = () => {
  return localStorage.getItem(server.LOGIN_PASSED) === YES;
};

function SecuredRoute({ children }) {
  return isLoggedIn() === true ? children : <Navigate to="/login" />;
}

class App extends Component {
  componentDidMount() {
    this.props.setApp(this);
  }
  render() {
    return (
      <BrowserRouter>
        <main>
          <div className={isLoggedIn() ? "pageWrapper d-lg-flex" : ""}>
            {isLoggedIn() && (
              <aside className="sidebarArea shadow" id="sidebarArea">
                <Sidebar />
              </aside>
            )}

            <div className={isLoggedIn() ? "contentArea" : ""}>
              {isLoggedIn() && <Header />}
              <Container className={isLoggedIn() ? "p-4 wrapper" : ""} fluid>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/home"
                    element={
                      <SecuredRoute>
                        <Home />
                      </SecuredRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <SecuredRoute>
                        <Profile />
                      </SecuredRoute>
                    }
                  />
                  <Route
                    path="/sale"
                    element={
                      <SecuredRoute>
                        <Sale />
                      </SecuredRoute>
                    }
                  />
                  <Route
                    path="/sale/info/:id"
                    element={
                      <SecuredRoute>
                       <OrderInfo/>
                      </SecuredRoute>
                    }
                  />
                  <Route
                    path="/users"
                    element={
                      <SecuredRoute>
                        <Users />
                      </SecuredRoute>
                    }
                  />
                  <Route
                    path="/user/create"
                    element={
                      <SecuredRoute>
                        <UserCreate />
                      </SecuredRoute>
                    }
                  />
                  <Route
                    path="/user/edit/:id"
                    element={
                      <SecuredRoute>
                       <UserInfo/>
                      </SecuredRoute>
                    }
                  />
                  <Route exact={true} path="/" element={
                    <SecuredRoute>
                      <Home />
                    </SecuredRoute>
                  } />
                  <Route path="*" element={
                      <SecuredRoute>
                       <Page404/>
                      </SecuredRoute>
                    }/>
                </Routes>
              </Container>
            </div>
          </div>
        </main>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  setApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
