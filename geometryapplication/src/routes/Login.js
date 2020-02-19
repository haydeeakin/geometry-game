import React from 'react';
import { gql, graphql } from 'react-apollo';

export class Login extends React.Component {
    state = {
        email: '',
        password: '',
    }
    
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    onSubmit = async () => {
        const response = await this.props.mutate({
            variables: this.state,
        });
        console.log(response);
    }

    render() {
        return (
            <div>
                <Input
                name='email'
                placeholder='Email'
                onChange={e => this.onChange(e)}
                value={this.state.email} />
                <Input
                name= 'password'
                placeholder= 'Password'
                type='password'
                onChange={e => this.onChange(e)}
                value={this.state.password} />
                <br />
                <Button onClick={() => this.onSubmit()} type='primary'>Login</Button>
            </div>
        );
    }
}