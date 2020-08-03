import { connect } from 'react-redux';
import { addSeatRequest, getRequests, loadSeatsRequest } from '../../../redux/seatsRedux';
import OrderTicketForm from './OrderTicketForm';

const mapStateToProps = state => ({
  requests: getRequests(state),
});

const mapDispatchToProps = dispatch => ({
  addSeat: (seat) => dispatch(addSeatRequest(seat)),
  loadSeats: (seat) => dispatch(loadSeatsRequest(seat)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderTicketForm);