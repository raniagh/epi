/*
=========================================================
Portail étudiant SWISSWAI
=========================================================
Routes file.
Copyright 2023 company "Zesty Swiss"
=========================================================
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import {
  Login,
  Dashboard,
  Profile,
  Cursus,
  Seance,
  Exercice,
  Facture,
} from "pages";

import AgendaIcon from "../src/Assets/img/icons/Agenda_icon.png";
import HomeIcon from "../src/Assets/img/icons/home_icon.png";
import ExerciceIcon from "../src/Assets/img/icons/Exercice_icon.png";
import CursusIcon from "../src/Assets/img/icons/Cursus_icon.png";
import InvoiceIcon from "../src/Assets/img/icons/Facture_icon.png";
import SettingIcon from "../src/Assets/img/icons/Parametres_icon.png";

import AgendaImage from "../src/Assets/img/icons/common/Agenda_sidebar_icon.png";
import HomeImage from "../src/Assets/img/icons/common/Home_sidebar_icon.png";
import BooksImage from "../src/Assets/img/icons/common/Books_sidebar_icon.png";
import NoteImage from "../src/Assets/img/icons/common/Note_sidebar_icon.png";
import InvoiceImage from "../src/Assets/img/icons/common/Invoice_sidebar_icon.png";

export const routes = [
  {
    path: "/dashboard",
    name: "Accueil",
    icon: <img src={HomeIcon} alt="icon" />,
    component: <Dashboard />,
    layout: "/home",
    image: HomeImage,
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-white",
    component: <Profile />,
    layout: "/home",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },

  {
    path: "/cursus",
    name: "Cursus",
    icon: <img src={CursusIcon} alt="icon" />,
    component: <Cursus />,
    layout: "/home",
    image: BooksImage,
  },
  {
    path: "/agenda",
    name: "Agenda",
    icon: <img src={AgendaIcon} alt="icon" />,
    component: <Seance />,
    layout: "/home",
    image: AgendaImage,
  },

  {
    path: "/exercices",
    name: "Exercices",
    icon: <img src={ExerciceIcon} alt="icon" />,
    component: <Exercice />,
    layout: "/home",
    image: NoteImage,
  },
  {
    path: "/facture",
    name: "Factures",
    icon: <img src={InvoiceIcon} alt="icon" />,
    component: <Facture />,
    layout: "/home",
    image: InvoiceImage,
  },
  {
    path: "/parametre",
    name: "Parametres",
    icon: <img src={SettingIcon} alt="icon" />,
    component: "",
    layout: "/home",
  },
];
