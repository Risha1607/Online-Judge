import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css'; // Make sure to import the CSS file

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Link to="/admin/create-problem">Create Problem</Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link to="/admin/delete-problem">Delete Problem</Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link to="/admin/update-problem">Update Problem</Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link to="/admin/create-contest">Create Contest</Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link to="/admin/delete-contest">Delete Contest</Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link to="/admin/update-contest">Update Contest</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;

