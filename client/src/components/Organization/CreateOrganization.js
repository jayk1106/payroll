import { Form, Input, Button, Alert } from 'antd';
import useHttp from '../../hooks/useHttp';
import style from './CreateOrganization.module.css';

const CreateOrganization = () => {  
    const {isLoadding, error, sendRequest} = useHttp();

    let errorContent = '';

    if(error){
        errorContent = <Alert message={error} type="error" showIcon closable />;
    }

    const onSubmitHandler = async (values) => {
        console.log(values);
        const data = await sendRequest({
            url : 'http://localhost:8080/api/v1/organization',
            options : {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : localStorage.getItem('token')
                },
                body : JSON.stringify(values)
            }
        })
        console.log(data);
    }
    return(
        <div className={style.container}>
            <div className={style.form}>
                {errorContent}
            <div className={style}>
                <div className={style.heading}>Create Your Organization</div>
                <p>Enter few detais and create your organization</p>
            </div>
            <Form
                layout="vertical"
                onFinish={onSubmitHandler}
                // initialValues={{ requiredMarkValue: requiredMark }}
                // onValuesChange={onRequiredTypeChange}
                // requiredMark={requiredMark}
                >
                <Form.Item label="Name" name="org_name" required>
                    <Input className={style.input} placeholder="Enter organization name" />
                </Form.Item>
                <Form.Item label="City" name="org_city" required>
                    <Input className={style.input} placeholder="Enter organization city" />
                </Form.Item>
                <Form.Item label="Country" name="org_country" required>
                    <Input className={style.input} placeholder="Enter organization country" />
                </Form.Item>
                <Form.Item label="Adress" name="org_address" required>
                    <Input.TextArea rows={4} placeholder="Enter organization adress"/>
                    {/* <Input className={style.input} placeholder="Enter organization adress" /> */}
                </Form.Item>
                <Form.Item>
                    <Button className={style.btn} type="primary" htmlType='submit' loading={isLoadding}>Create Organization</Button>
                </Form.Item>
            </Form>
            </div>
        </div>
    )
}

export default CreateOrganization;