import { useEffect, useState, useCallback } from "react";

import "../css/Profile.css";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import ROLES from "../config/roles";

import ProfileHeader from "../components/profile/ProfileHeader";
import PersonalInfoCard from "../components/profile/PersonalInfoCard";
import StatisticsCard from "../components/profile/StatisticsCard";

import EmployeeProfile from "../components/profile/EmployeeProfile";
import TeamLeadProfile from "../components/profile/TeamLeadProfile";
import HRProfile from "../components/profile/HRProfile";
import SuperAdminProfile from "../components/profile/SuperAdminProfile";

import EditProfileModal from "../components/profile/EditProfileModal";
import PersonalInfoModal from "../components/profile/PersonalInfoModal";


function Profile() {


    const axiosPrivate = useAxiosPrivate();

    const { auth } = useAuth();


    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);


    const [showEditModal, setShowEditModal] = useState(false);

    const [showPersonalModal, setShowPersonalModal] = useState(false);



    const loadProfile = useCallback(async () => {


        try {


            setLoading(true);


            const response = await axiosPrivate.get(
                "/profile"
            );


            setProfile(response.data);


        }

        catch (err) {


            console.error(err);


            alert(

                err.response?.data?.message ||

                "Unable to load profile."

            );


        }

        finally {


            setLoading(false);


        }


    }, [axiosPrivate]);



    useEffect(() => {


        loadProfile();


    }, [loadProfile]);



    if (loading) {


        return (

            <div className="profile-loading">

                Loading Profile...

            </div>

        );

    }



    if (!profile) {


        return (

            <div className="profile-loading">

                Failed to load profile.

            </div>

        );

    }



    return (

        <div className="profile-page">


            <h2 className="profile-page-title">

                My Profile

            </h2>



            <ProfileHeader

                personalDetails={profile.personalDetails}

                onEdit={() => setShowEditModal(true)}

            />



            <PersonalInfoCard

                personalDetails={profile.personalDetails}

                onEdit={() => setShowPersonalModal(true)}

            />



            <StatisticsCard

                statistics={profile.statistics}

            />



            {auth.roles?.includes(ROLES.TeamLead) && (

                <TeamLeadProfile

                    projects={profile.managedProjects}

                    teamMembers={profile.teamMembers}

                />

            )}



            {(auth.roles?.includes(ROLES.Employee) ||

                auth.roles?.includes(ROLES.Intern)) && (

                <EmployeeProfile

                    tasks={profile.tasks}

                    achievements={profile.achievements}

                />

            )}



            {auth.roles?.includes(ROLES.HR) && (

                <HRProfile

                    statistics={profile.statistics}

                />

            )}



            {auth.roles?.includes(ROLES.SuperAdmin) && (

                <SuperAdminProfile

                    statistics={profile.statistics}

                />

            )}



            {showEditModal && (


                <EditProfileModal

                    personalDetails={profile.personalDetails}


                    onClose={() =>

                        setShowEditModal(false)

                    }


                    onSuccess={() => {

                        setShowEditModal(false);

                        loadProfile();

                    }}

                />


            )}




            {showPersonalModal && (


                <PersonalInfoModal

                    personalDetails={profile.personalDetails}


                    onClose={() =>

                        setShowPersonalModal(false)

                    }


                    onSuccess={() => {

                        setShowPersonalModal(false);

                        loadProfile();

                    }}

                />


            )}



        </div>

    );

}


export default Profile;