import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { Button } from '@material-ui/core';
import { getLevels, getTechnologies, getJobFunctions, getProfile } from 'redux/actions';
import { IRootState, IDepartment, ISkill, IJobFunction } from 'declarations/interfaces';
import { ControllersContainer } from 'components/shared/page';
import { GeneralForm } from 'components/shared/form';
import { getViewProfileLink } from 'helpers';
import { goBack, goTo } from 'customHistory';
import { CvDocument } from './document';

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
}

export const GenerateCVPage: React.FC = () => {
  const profile = useSelector((state: IRootState) => state.profiles.profile);
  const levels = useSelector((state: IRootState) => state.levels.data);
  const technologies = useSelector((state: IRootState) => state.technologies.data);
  const jobFunctions = useSelector((state: IRootState) => state.jobFunctions.data);
  const { loading } = useSelector((state: IRootState) => state.loader);

  const dispatch = useDispatch();

  const { userId, profileId } = useParams<IParams>();

  useEffect(() => {
    dispatch(getLevels());
    dispatch(getTechnologies());
    dispatch(getJobFunctions());
  }, [dispatch]);

  useEffect(() => {
    if ((!profile.id || profileId !== profile.id) && !loading) {
      dispatch(getProfile(profileId));
    }
  }, [dispatch]);

  const fields = useMemo(() => {
    return [
      {
        id: '3',
        type: 'textField',
        props: {
          name: 'surname',
          label: 'Фамилия',
        },
      },
      {
        id: '4',
        type: 'textField',
        props: {
          name: 'name',
          label: 'Имя',
        },
      },
      {
        id: '5.75',
        type: 'select',
        props: {
          name: 'job_function',
          label: 'Должность',
          options: jobFunctions,
          getOptionLabel: (option: IJobFunction) => option.name,
        },
      },
      {
        id: '7',
        type: 'datePicker',
        props: {
          name: 'companyStartDate',
          label: 'Начала работы в компании',
        },
      },
      {
        id: '8',
        type: 'textField',
        props: {
          name: 'mobilePhone',
          label: 'Мобильный телефон',
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
          label: 'Характеристика',
        },
      },
      {
        id: '10.2',
        type: 'textField',
        props: {
          name: 'education',
          label: 'Образование',
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
          label: 'Фото',
          imageURL: profile.photoLink,
        },
      },
    ];
  }, [levels, technologies, jobFunctions]);

  const onSubmit = async (values: IValues) => {
    const doc = <CvDocument profile={values} />;
    const asPdf = pdf();
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();
    await saveAs(blob, `${values.name}${values.surname}_CV.pdf`);
    // goTo(getViewProfileLink(userId, profileId))
  };

  const validate = async (values: IValues) => {
    const errors: { [k: string]: string } = {};
    if (!values.name) {
      errors.name = 'Обязательное поле';
    }
    if (!values.surname) {
      errors.surname = 'Обязательное поле';
    }
    return errors;
  };

  return (
    <main>
      <ControllersContainer>
        <Button onClick={goBack} color="secondary">
          Вернуться назад
        </Button>
      </ControllersContainer>
      {profileId === profile.id && (
        <GeneralForm
          initialValues={profile}
          fields={fields}
          onSubmit={onSubmit}
          validate={validate}
          formTitle="Генерация CV"
          saveBtnText="Сгенерировать"
        />
      )}
    </main>
  );
};
