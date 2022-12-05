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
      $locationData: JSONObject,
      $selected: Boolean,
    ){
      addAddress(createAddressInput:{
        name: $name,
        details: $details,
        locationData: $locationData,
        selected: $selected
      }){
        id
        name
        details
        selected
        locationData
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
  updatePatientBasicInfo: () => gql`
    mutation updatePatientBasicInfo(
      $id: ID!,
      $name: String,
      $gender: String,
      $birthdate: Int,
      $email: String,
      $zipCode: String
    ) {
      updatePatient(input: {
        id: $id,
        name: $name,
        gender: $gender,
        birthdate: $birthdate
        email: $email,
        zipCode: $zipCode
      }) {
        clientMutationId
      }
    }
  `,
  updatePatientLifestyleInfo: () => gql`
    mutation updatePatientLifestyleInfo(
      $id: ID!,
      $isSmoker: Int,
      $physicalActivityLevel: Int,
      $sleepHours: Int,
      $mood: Int,
      $weeklyExercisedDays: Int
    ) {
      updatePatient(input: {
        id: $id,
        isSmoker: $isSmoker,
        physicalActivityLevel: $physicalActivityLevel,
        sleepHours: $sleepHours,
        mood: $mood,
        weeklyExercisedDays: $weeklyExercisedDays
      }) {
       patient {
        id
       }
      }
    }
  `,
  updatePatientMetricsInfo: () => gql`
    mutation updatePatientMetricsInfo(
      $id: ID!,
      $height: String,
      $weight: String,
      $bloodPressureSystolic: Int,
      $bloodPressureDiastolic: Int,
      $abdominalCircumference: String
    ) {
      updatePatient(input: {
        id: $id,
        height: $height,
        weight: $weight,
        bloodPressureSystolic: $bloodPressureSystolic,
        bloodPressureDiastolic: $bloodPressureDiastolic,
        abdominalCircumference: $abdominalCircumference
      }) {
       patient {
        id
       }
      }
    }
  `,
  updatePatientHealthInfo: () => gql`
    mutation updatePatientHealthInfo(
      $id: ID!,
      $triglycerides: String,
      $hdl: String,
      $cholesterol: String,
      $hasHypercholesterolemia: Boolean,
    ) {
      updatePatient(input: {
        id: $id,
        triglycerides: $triglycerides,
        hdl: $hdl,
        cholesterol: $cholesterol,
        hasHypercholesterolemia: $hasHypercholesterolemia
      }) {
       patient {
        id
       }
      }
    }
  `,
  createDiagnosedPathology: () => gql`
      mutation createDiagnosedPathology(
      $pathology: String!,
      $year: String!,
      $patient: String!,
      $type: String!
    ) {
      createDiagnosedPathology(input: {
        pathology:$pathology,
        year: $year,
        patient: $patient,
        type: $type
      }) {
        diagnosedPathology {
          id
        }
      }
    }
  `,
  deleteDiagnosedPathology: () => gql`
    mutation deleteDiagnosedPathology(
      $id: ID!
    ) {
      deleteDiagnosedPathology(input: {
        id:$id
      }) {
        diagnosedPathology {
          id
        }
      }
    }
  `,
  setHasPathology: () => gql`
     mutation updatePatientHasPathology(
      $id: ID!,
      $hasDiagnosedPathology: Boolean,
    ) {
      updatePatient(input: {
        id: $id,
        hasDiagnosedPathology: $hasDiagnosedPathology,
      }) {
       patient {
        id
       }
      }
    }
    `,
  createCompleteTask: () => gql`
    mutation createCompleteTask(
      $title: String!,
      $patient: String!,
      $category: String!,
      $completedAt: Int!,
      $internalName: String!,
      $description: String){
      createCompletedTask(input: {
        title: $title
        patient:$patient
        category: $category
        completedAt: $completedAt
        internalName: $internalName
        description: $description
      }){
        clientMutationId
      }
    }`
};
