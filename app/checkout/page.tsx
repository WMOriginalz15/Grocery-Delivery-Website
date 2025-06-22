import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import CheckoutClient from "./CheckoutClient";

const Checkout = () => {
  // TODO: Replace with actual user email from session or context
  const userEmail = "test@example.com";
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <CheckoutClient userEmail={userEmail} />
        </FormWrap>
      </Container>
    </div>
  );
};

export default Checkout;
