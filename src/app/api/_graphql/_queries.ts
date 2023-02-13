import { gql } from 'apollo-angular';

export const queries = {
  getUsers: () => gql`
    query getUsers {
      getUsers{
        id
        email
        username
      }
    }
  `
  ,
  getPathologiesAndTypes: () => gql`
    query getPathologiesAndTypes {
      pathologyTypes {
        collection {
          id
          name
          pathologies {
            collection {
              id
              name
            }
          }
        }
      }
    }
  `,
  getUserById: () => gql`
    query getUserById($id: Int!){
      getUserById(id: $id){
        id
        email
        username
        role
        profile{
          firstName
          lastName
          gender
          phone
          dateOfBirth
          filter
        }
      }
    }
  `,
  getAddressesByUser: () => gql`
    query getAddressesByUser{
      getAddressesByUser{
      id
      name
      details
      description
      locationData
      selected
    }
  }
  `,
  getRequestsByUser: () => gql`
    query getRequestsByUser{
      getRequestsByUser{
        id
        tag
        date
        datetime
        ableToPay
        price
        coin
        from
        to
        status
    }
  }
  `,
  getAddressById: () => gql`
    query getAddressById($id: Int!){
      getAddressById(id: $id){
        id
        name
        details
        description
        locationData
        selected
    }
  }
  `,
  getCategories: () => gql`
    query getCategories{
      getCategories{
        id
        name
        color
        code
        photo
    }
  }
  `,
  getTransportServices: () => gql`
    query getTransportServices{
      getTransportServices{
        name
        status
        photo
        rating
        address
        schedule
        pickupTime
        category{
          id
          name
        }
      }
    }
  `,
  getDiagnosedPathologies: () => gql`
    query getDiagnosedPathologies(
    $itemsPerPage: Int,
    $page: Int,
    $patient_id: Int!,
    $patient_id_list: [Int],
    $order: [DiagnosedPathologyFilter_order]) {
      diagnosedPathologies(page: $page,
      itemsPerPage: $itemsPerPage,
      patient_id: $patient_id,
      patient_id_list: $patient_id_list,
      order: $order) {
        collection {
          id
          year
          pathology
        }
      }
    }
  `,
  getPatient: () => gql`
    query getPatient($id:ID!) {
      patient(id: $id) {
        id
        height
        weight
        bloodPressureSystolic
        bloodPressureDiastolic
        abdominalCircumference
        physicalActivityLevel
        weeklyExercisedDays,
        sleepHours
        isSmoker
        mood
        triglycerides
        hdl
        cholesterol
        hasHypercholesterolemia
        hasDiagnosedPathology
        diagnosedDiseases {
          collection {
            id
            year
            pathology
          }
        }
        username
        email
        name
        birthdate
        lastname
        zipCode
        gender
        dni
        mobile
      }
    }
  `
};
