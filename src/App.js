import { Field, FieldArray, reduxForm } from 'redux-form'

const renderField = ({input, label, type, meta: {touched, error}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const renderMembers = ({fields, meta: {error, submitFailed}}) => (
  <ul>
    <li>
      <button type='button' onClick={() => fields.push({})}>
        Add Member
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((member, index) => (
      <li key={index}>
        <button
          type='button'
          title="Remove Member"
          onClick={() => fields.remove(index)}
        />
        <h4>Member #{index + 1}</h4>
        <Field
          name={`${member}.firstName`}
          type="text"
          component={renderField}
          label="First Name"
        />
        <Field
          name={`${member}.lastName`}
          type="text"
          component={renderField}
          label="Last Name"
        />
        <FieldArray name={`${member}.hobbies`} component={renderHobbies} />
      </li>
    ))}
  </ul>
)

const renderHobbies = ({fields, meta: { error }}) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>
        Add Hobby
      </button>
    </li>
    {fields.map((hobby, index) => (
      <li key={index}>
        <button
          type='button'
          title="Remove Hobby"
          onClick={() => fields.remove(index)}
      />
          //Todo
        <Field
          name={`${member}.firstName`}
          type="text"
          component={renderField}
          label="First Name"
        />
      </li>
    ))}
  </ul>
)

const App = props => {
  const { pristine, reset, submitting } = props;
  return (
    <div className="App">
      <form>
        <Field
          name='clubName'
          type="text"
          component={renderField}
          label='Club Name'
        />
        <FieldArray name='members' component={renderMembers} />
        <div>
          <button type='button' disabled={submitting}>
            Submit
          </button>
          <button type='button' disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    </div>
  );
}

export default reduxForm({
  form: 'fieldArrays'
})(App)
