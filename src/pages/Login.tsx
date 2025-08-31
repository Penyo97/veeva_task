import axios from 'axios'
import {useState} from "react";
import {Form, Input, Button, Card, Typography, message} from "antd";
import {LoginContainer} from "./LoginStlye.ts";
import {useNavigate} from "react-router-dom";
import {sessionEnum} from "../utilities/enums.ts";

const {Title} = Typography;
const Login = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate()


    const onFinish = async (values: { username: string; password: string }) => {
        setLoading(true);
        const {username, password} = values;
        try {
            const response = await axios.post(
                "/api/v23.1/auth",
                new URLSearchParams({
                    username,
                    password,
                }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Accept: "application/json",
                    },
                }
            );
            sessionStorage.setItem(sessionEnum.SESSION_ID, response.data.sessionId)
            navigate("/dashboard");
            setLoading(false)
        } catch (err) {
            message.error(err.response?.data || err.message)
        }
    };

    return (
        <LoginContainer>
            <Card style={{width: 400}}>
                <Title level={3} style={{textAlign: "center"}}>
                    Login to Vault
                </Title>
                <Form
                    name="login"
                    onFinish={onFinish}
                    layout="vertical"
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{required: true, message: "Please enter your username!"}]}
                    >
                        <Input placeholder="Enter username"/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: true, message: "Please enter your password!"}]}
                    >
                        <Input.Password placeholder="Enter password"/>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                            style={{marginTop: "10px"}}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </LoginContainer>
    )
}

export default Login;