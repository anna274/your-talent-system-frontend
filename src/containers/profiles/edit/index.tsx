import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import {
  getLevels,
  getTechnologies,
  updateProfile,
  getDepartments,
  getJobFunctions,
  getProfile,
} from 'redux/actions';
import { objectToFormData } from 'helpers';
import { IRootState, IDepartment, ISkill, IJobFunction } from 'declarations/interfaces';
import { ControllersContainer } from 'components/shared/page';
import { GeneralForm } from 'components/shared/form';
import { goBack } from 'customHistory';
import { validationSchema } from './schema';

interface IParams {
  userId: string;
  profileId: string;
}

interface IValues {
  login: string;
  password: string;
  repeatPassword: string;
  surname: string;
  name: string;
  patronymic: string;
  department: IDepartment;
  jobFunction: IJobFunction;
  careerStartDate: Date | null;
  companyStartDate: Date | null;
  mobilePhone: string;
  email: string;
  skills: ISkill[];
  summary: string;
  photoLink: string;
}

export const EditProfilePage: React.FC = () => {
  const profile = useSelector((state: IRootState) => state.profiles.profile);
  const levels = useSelector((state: IRootState) => state.levels.data);
  const technologies = useSelector((state: IRootState) => state.technologies.data);
  const departments = useSelector((state: IRootState) => state.departments.data);
  const jobFunctions = useSelector((state: IRootState) => state.jobFunctions.data);
  const { loading } = useSelector((state: IRootState) => state.loader);

  const [isPhotoCleaned, setIsPhotoCleaned] = useState(false);

  const dispatch = useDispatch();

  const { userId, profileId } = useParams<IParams>();

  useEffect(() => {
    dispatch(getLevels());
    dispatch(getTechnologies());
    dispatch(getDepartments());
    dispatch(getJobFunctions());
  }, [dispatch]);

  useEffect(() => {
    if ((!profile.id || profileId !== profile.id) && !loading) {
      dispatch(getProfile(profileId));
    }
  }, [dispatch]);

  const cleanPhoto = () => {
    setIsPhotoCleaned(true);
  };

  const fields = useMemo(() => {
    return [
      {
        id: '3',
        type: 'textField',
        props: {
          name: 'surname',
          label: '??????????????',
        },
      },
      {
        id: '4',
        type: 'textField',
        props: {
          name: 'name',
          label: '??????',
        },
      },
      {
        id: '5',
        type: 'textField',
        props: {
          name: 'patronymic',
          label: '????????????????',
        },
      },
      {
        id: '5.5',
        type: 'select',
        props: {
          name: 'department',
          label: '??????????????????????',
          options: departments,
          getOptionLabel: (option: IDepartment) => option.name,
        },
      },
      {
        id: '5.75',
        type: 'select',
        props: {
          name: 'job_function',
          label: '??????????????????',
          options: jobFunctions,
          getOptionLabel: (option: IJobFunction) => option.name,
        },
      },
      {
        id: '6',
        type: 'datePicker',
        props: {
          name: 'careerStartDate',
          label: '???????????? ???????????? ?? ??????????',
        },
      },
      {
        id: '7',
        type: 'datePicker',
        props: {
          name: 'companyStartDate',
          label: '???????????? ???????????? ?? ????????????????',
        },
      },
      {
        id: '9',
        type: 'textField',
        props: {
          name: 'email',
          label: 'E-mail',
        },
      },
      {
        id: '10',
        type: 'textBox',
        props: {
          name: 'summary',
          label: '????????????????',
        },
      },
      {
        id: '11',
        type: 'skillsInput',
        props: {
          name: 'skills',
          levels,
          technologies,
        },
      },
      {
        id: '12',
        type: 'imagePreview',
        props: {
          name: 'photoLink',
          label: '????????',
          onClear: cleanPhoto,
        },
      },
    ];
  }, [levels, departments, technologies, jobFunctions]);

  const onSubmit = (values: IValues) => {
    const { photoLink, ...rest } = values;
    dispatch(
      updateProfile(
        profileId,
        objectToFormData({
          profileData: rest,
          oldAvatarURL: isPhotoCleaned ? '' : profile.photoLink,
          photoLink,
        }),
        userId,
      ),
    );
  };

  return (
    <main>
      <ControllersContainer>
        <Button onClick={goBack} color="secondary">
          ?????????????????? ??????????
        </Button>
      </ControllersContainer>
      {profileId === profile.id && (
        <GeneralForm
          initialValues={profile}
          fields={fields}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          formTitle="???????????????????????????? ??????????????"
        />
      )}
    </main>
  );
};
