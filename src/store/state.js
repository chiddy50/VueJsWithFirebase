export default{
  network: window.navigator.connection.effectiveType,
  users: [],
  paginationUsers: [],
  isInternetConnected: false,
  fetchUsersLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  edit: false,
  id: null,
  user_id: null,
  name: null,
  age: null,
  blood_group: null,
  blood_groups: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
};

