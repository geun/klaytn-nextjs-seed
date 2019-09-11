import React from 'react';
import { Button, Form, Input, InputNumber } from 'antd';

class WithDrawInputComp extends React.Component {
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
			<Form layout="vertical" onSubmit={this.onInputChangeHandle} style={{ marginTop: 32 }}>
				<Form.Item>{getFieldDecorator('amount', {})(<InputNumber placeholder="Amount" />)}</Form.Item>
				<Form.Item>
					<Button htmlType="submit" type="primary">WithDraw</Button>
				</Form.Item>
			</Form>
		);
	}
}

const WithdrawInput = Form.create()(WithDrawInputComp);

export default WithdrawInput;
