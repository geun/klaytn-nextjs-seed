import React from 'react';
import { Button, Form, Input } from 'antd';

class NewUserInputComp extends React.Component {
	onInputChangeHandle = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.onSubmit(values);
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<Form layout="inline" onSubmit={this.onInputChangeHandle} style={{ marginTop: 32 }}>
				<Form.Item>
					{getFieldDecorator('name', {})(
						<Input placeholder="사용자명을 입력해주세요." />
					)}
				</Form.Item>

				<Form.Item>
					<Button htmlType="submit" type="primary">
						추가하기
					</Button>
				</Form.Item>
			</Form>
		);
	}
}

const NewUserInput = Form.create()(NewUserInputComp);

export default NewUserInput;