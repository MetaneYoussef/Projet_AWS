import React, { useState, useCallback } from 'react';
import Header from '../../components/Header/SeriesDetailHeader';
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

    const genres = ["Comédie", "Drame", "Horreur", "Science-Fiction", "Documentaire", "Autre"];
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
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {/* Nom d'utilisateur */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
                        <input type="text" name="username" id="username" autoComplete="username" 
                               className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 
                               focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" 
                               value={userPreferences.username} onChange={handleChange} />
                        {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
                    </div>
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" name="email" id="email" autoComplete="email" 
                               className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 
                               focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" 
                               value={userPreferences.email} onChange={handleChange} />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                    </div>
                    {/* Mot de passe */}

                    <div>
                        <label htmlFor="favoriteGenres" className="block text-sm font-medium text-gray-700">Genres favoris</label>
                        <select name="favoriteGenres" id="favoriteGenres" value={userPreferences.favoriteGenres || 'Autre'} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            {genres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
                        </select>
                        {userPreferences.favoriteGenres === 'Autre' && (
                            <input type="text" name="customGenre" value={customGenre} onChange={handleCustomChange} placeholder="Votre genre favori" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
                        )}
                    </div>

                    <div>
                        <label htmlFor="favoriteDirectors" className="block text-sm font-medium text-gray-700">Réalisateurs favoris</label>
                        <select name="favoriteDirectors" id="favoriteDirectors" value={userPreferences.favoriteDirectors || 'Autre'} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                            {directors.map(director => <option key={director} value={director}>{director}</option>)}
                        </select>
                        {userPreferences.favoriteDirectors === 'Autre' && (
                            <input type="text" name="customDirector" value={customDirector} onChange={handleCustomChange} placeholder="Votre réalisateur favori" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
                        )}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                        <input type="password" name="password" id="password" autoComplete="current-password" 
                               className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 
                               focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" 
                               value={userPreferences.password} onChange={handleChange} />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                    </div>
                    {/* Sélecteurs et champs personnalisés pour Genres et Réalisateurs favoris */}
                    {/* Bouton de soumission */}
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
