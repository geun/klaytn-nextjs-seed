import React from 'react';
import { Button, Form, Input, InputNumber } from 'antd';

class AmountInputComp extends React.Component {
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
					{getFieldDecorator('address', {})(<Input placeholder="Address" />)}
				</Form.Item>

				<Form.Item>
					{getFieldDecorator('amount', { initialValue: 0.01 })(
						<InputNumber min={0.01} max={50000000} step={0.01} placeholder="Amount" />
					)}
				</Form.Item>

				<Form.Item>
					<Button htmlType="submit">SEND</Button>
				</Form.Item>
			</Form>
		);
	}
}

const AmountInput = Form.create()(AmountInputComp);

export default AmountInput;
