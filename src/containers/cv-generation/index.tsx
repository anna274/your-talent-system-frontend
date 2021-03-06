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
import { goBack } from 'customHistory';
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

  console.log('profile', profile);

  const dispatch = useDispatch();

  const { profileId } = useParams<IParams>();

  useEffect(() => {
    dispatch(getLevels());
    dispatch(getTechnologies());
    dispatch(getJobFunctions());
  }, [dispatch]);

  useEffect(() => {
    if ((!profile.id || profileId !== profile.id) && !loading) {
      dispatch(getProfile(profileId));
    }
  }, [dispatch, profile.id, profileId]);

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
        id: '7',
        type: 'datePicker',
        props: {
          name: 'careerStartDate',
          label: '???????????? ???????????? ?? ??????????',
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
          label: '????????????????????????????',
        },
      },
      {
        id: '10.2',
        type: 'textField',
        props: {
          name: 'education',
          label: '??????????????????????',
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
        },
      },
    ];
  }, [levels, technologies, jobFunctions]);

  const onSubmit = async (values: IValues) => {
    const doc = <CvDocument profile={values} />;
    // const asPdf = pdf();
    // asPdf.updateContainer(doc);
    const blob = await pdf(doc).toBlob();
    await saveAs(blob, `${values.name}${values.surname}_CV.pdf`);
    // goTo(getViewProfileLink(userId, profileId))
  };

  const validate = async (values: IValues) => {
    const errors: { [k: string]: string } = {};
    if (!values.name) {
      errors.name = '???????????????????????? ????????';
    }
    if (!values.surname) {
      errors.surname = '???????????????????????? ????????';
    }
    return errors;
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
          validate={validate}
          formTitle="?????????????????? CV"
          saveBtnText="??????????????????????????"
        />
      )}
    </main>
  );
};
