import { gql } from 'apollo-angular';

export const mutations = {
  login: () => gql`
    mutation login(
      $email: String!,
      $password: String!,
    ){
    login(loginUserInput: {
      email: $email,
      password: $password
    }){
      accessToken
      user{
        id
        username
      }
    }
    }
  `,
  verifyEmailByPin: () => gql`
    mutation verifyEmailByPin(
      $id: ID!,
      $pin: String!
    ){
      verifyEmailByPin(verifyByPinInput: {
        id: $id,
        pin: $pin
      }){
        email
        emailVerified
      }
    }
  `,
  createAccount: () => gql`
    mutation createAccount(
      $email: String!, 
      $password: String!
      ){
      createAccount(createUserInput: {
        email: $email,
        password: $password,
      })
      {
        id
      }
    }
  `,
  updateProfile: () => gql`
    mutation updateProfile(
      $firstName: String,
      $lastName: String,
      $gender: Gender,
      $phone: String,
      $dateOfBirth: DateTime
    ){
      updateProfile(updateProfileInput: {
        firstName: $firstName,
        lastName: $lastName,
        gender: $gender,
        phone: $phone,
        dateOfBirth: $dateOfBirth
      }){
        firstName
        lastName
        gender
        filter
        user{
          role
        }
      }
  },
  `,
  updateFilter: () => gql`
    mutation updateFilter(
      $filter: JSONObject
    ){
      updateProfile(updateProfileInput: {
        filter: $filter
      }){
        filter
      }
  }
  `,
  addAddress: () => gql`
    mutation addAddress(
      $name: String!,
      $details: String,
      $description: String!,
      $locationData: JSONObject,
      $selected: Boolean,
    ){
      addAddress(createAddressInput:{
        name: $name,
        details: $details,
        description: $description,
        locationData: $locationData,
        selected: $selected
      }){
        id
        name
        details
        description
        selected
        locationData
      }
    }
  `,
   editAddress: () => gql`
    mutation editAddress(
      $id: Int!,
      $name: String!,
      $details: String,
      $description: String!,
      $locationData: JSONObject,
      $selected: Boolean,
    ){
      editAddress(updateAddressInput:{
        id: $id,
        name: $name,
        details: $details,
        description: $description,
        locationData: $locationData,
        selected: $selected
      }){
        id
        name
        details
        description
        selected
        locationData
      }
   }
 `,
 removeAddress: () =>gql`
  mutation removeAddress(
      $id: Int!
    ){
      removeAddress(id: $id){
        id
        name
      }
  }
 `,
  setSelectedAddress: () => gql`
    mutation setSelectedAddress(
      $id: Int!
    ){
      setSelectedAddress(
        id: $id
        ){
          id
          name
          details
          locationData
          selected       
      }
    }
  `,
  addRequest: () => gql`
    mutation addRequest(
      $tag: String!,
      $date: DateTime!,
      $datetime: JSONObject!,
      $ableToPay: Float!,
      $price: Float,
      $coin: String!,
      $from: JSONObject!,
      $to: JSONObject!,
      $status: String!
  ){
    addRequest(createRequestInput:{
      tag: $tag,
      date: $date,
      datetime: $datetime,
      ableToPay: $ableToPay,
      price: $price,
      coin: $coin,
      from: $from,
      to: $to,
      status: $status
    }){
      tag
      user{
        email
      }
    }
  }
  `,
  deleteRequest: () => gql`
    mutation deleteRequest(
      $id: Int!
    )
    {
      deleteRequest(id: $id){
        id
      }
    }
  `,
};
