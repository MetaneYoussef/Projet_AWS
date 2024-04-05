import React, { useState, useCallback } from 'react';
import Select from 'react-select'; // Import de react-select
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';

function UserProfile() {
  const [userPreferences, setUserPreferences] = useState({
      username: "AWS Projet",
      favoriteGenres: "",
      favoriteDirectors: "",
      email: "AWSProjet@email.com",
      password: ""
  });
  const [customGenre, setCustomGenre] = useState('');
  const [customDirector, setCustomDirector] = useState('');
  const [errors, setErrors] = useState({});

  const directors = ["Quentin Tarantino", "Christopher Nolan", "Greta Gerwig", "Bong Joon-ho", "Autre"];

  const validateField = useCallback((name, value) => {
      let newErrors = { ...errors };
      if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = 'Email invalide.';
      } else if (name === 'password' && value.length < 6) {
          newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères.';
      } else if (name === 'username' && (!value || value.length < 3)) {
          newErrors.username = 'Le nom d\'utilisateur doit contenir au moins 3 caractères.';
      } else {
          delete newErrors[name];
      }
      setErrors(newErrors);
  }, [errors]);

  const handleChange = useCallback((e) => {
      const { name, value } = e.target;
      setUserPreferences(prevState => ({ ...prevState, [name]: value }));
      validateField(name, value);
  }, [validateField]);

  const handleCustomChange = useCallback((e) => {
      const { name, value } = e.target;
      if (name === 'customGenre') {
          setCustomGenre(value);
          setUserPreferences(prevState => ({ ...prevState, favoriteGenres: "Autre", customGenre: value }));
      } else if (name === 'customDirector') {
          setCustomDirector(value);
          setUserPreferences(prevState => ({ ...prevState, favoriteDirectors: "Autre", customDirector: value }));
      }
  }, []);

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (Object.keys(errors).length === 0 && Object.values(userPreferences).every(value => value)) {
          console.log("Submitting:", userPreferences);
          // Placeholder for submitting data to backend
      } else {
          alert('Veuillez corriger les erreurs avant de soumettre.');
      }
  };

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const genresOptions = ["Action", "Comédie", "Animation", "Émotion", "Jeunesse", "Horreur", "Science-Fiction", "Suspense"].map(genre => ({ value: genre, label: genre }));

  const handleGenreChange = selectedOptions => {
    setUserPreferences(prevState => ({
      ...prevState,
      favoriteGenres: selectedOptions.map(option => option.value)
    }));
  };

  const handleChangePasswordSubmit = e => {
    e.preventDefault();
    // Logique pour changer le mot de passe
    console.log("Changement de mot de passe soumis");
    setShowChangePasswordModal(false); // Fermer le modal après soumission
  };

  return (
  <>
    <Header />
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-orange-400 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-lg">
            <div className="text-center">
                <Link to="/">
                    <img className="mx-auto h-20 w-auto" src="/images/RondSansFond.png" alt="Logo" />
                </Link>
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Éditez votre profil</h2>
            </div>
            <form className="mt-8 space-y-6">
                {/* Nom d'utilisateur et Email en lecture seule avec options de modification */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Nom d'utilisateur: {userPreferences.username}</span>
                        <button type="button" className="text-indigo-600 hover:text-indigo-900 text-sm">Changer</button>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Email: {userPreferences.email}</span>
                        <button type="button" className="text-indigo-600 hover:text-indigo-900 text-sm">Changer</button>
                    </div>
                </div>

                {/* Modal pour changer le mot de passe */}
                {showChangePasswordModal && (
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-5 rounded-lg">
                      <form onSubmit={handleChangePasswordSubmit}>
                        <div className="text-lg font-semibold">Changer le mot de passe</div>
                        <input type="password" placeholder="Ancien mot de passe" className="input" required />
                        <input type="password" placeholder="Nouveau mot de passe" className="input" required />
                        <input type="password" placeholder="Confirmez le nouveau mot de passe" className="input" required />
                        <button type="submit" className="button">Changer</button>
                        <button type="button" onClick={() => setShowChangePasswordModal(false)}>Annuler</button>
                      </form>
                    </div>
                  </div>
                )}

                {/* Sélecteur de genres avec tags */}
                <div>
                  <label>Genres favoris</label>
                  <Select
                    isMulti
                    name="genres"
                    options={genresOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleGenreChange}
                  />
                </div>

                {/* Bouton de soumission des modifications */}
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                    Enregistrer les modifications
                </button>
            </form>
        </div>
    </div>
    <Footer />
  </>
  );
}

export default UserProfile;