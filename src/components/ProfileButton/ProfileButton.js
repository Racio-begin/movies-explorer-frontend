import { useNavigate } from 'react-router-dom';
import './ProfileButton.css';

function ProfileButton() {

	const navigate = useNavigate();

	function handleProfile() {
		navigate('/profile');
	};

	return (
		<button
			className="profile-button button"
			type="button"
			onClick={handleProfile}>
		</button>
	);
};

export default ProfileButton;