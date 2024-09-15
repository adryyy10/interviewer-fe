import React from 'react';
import { Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <h1>Question Management</h1>
      {/*
      <Link to="/create">
        <button>Create New Question</button>
      </Link>
      */}
      <Link to="/questions">
        <button>View Questions</button>
      </Link>
    </div>
  );
};

export default Layout;
