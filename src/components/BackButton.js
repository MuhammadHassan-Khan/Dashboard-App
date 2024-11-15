import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <button
            onClick={handleBack}
            className="bg-gray-500 text-white px-7 py-2 mb-5 rounded hover:bg-gray-600"
        >
            Back
        </button>
    );
};

export default BackButton;
