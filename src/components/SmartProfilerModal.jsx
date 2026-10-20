import CompleteProfileModal from './CompleteProfileModal';

export default function SmartProfilerModal(props) {
  // If rendered inline without isOpen prop, default isOpen to true
  return <CompleteProfileModal isOpen={props.isOpen !== undefined ? props.isOpen : true} {...props} />;
}
