import * as React from 'react';
import { Document, Font, Page, StyleSheet, Text, View, Image } from '@react-pdf/renderer';
import { getExperienceText, getMainSkills, sortSkillsByLevels } from 'helpers';
import defaultAvatar from 'assets/images/defaults/default-avatar.jpg';

export const styles = StyleSheet.create({
  body: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    fontFamily: 'Roboto',
  },
  header: {
    fontSize: 30,
    marginBottom: 15,
  },
  dimText: {
    color: '#A7A7B8',
  },
  dimView: {
    backgroundColor: '#EFEFEF',
    padding: 10,
    fontSize: 15,
    marginVertical: 10,
    position: 'relative',
    left: 0,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  middleText: {
    fontSize: 12,
  },
  smallText: {
    fontSize: 10,
  },
  title: {
    marginBottom: 5,
  },
  listItem: {
    marginBottom: 3,
    paddingLeft: 10,
  },
  avatar: {
    position: 'absolute',
    top: 30,
    right: 20,
    width: 90,
    height: 'auto',
    borderRadius: '50%',
  },
});

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
});

const getProfilePhotoLink = (photoLink: any) => {
  if (photoLink && typeof photoLink === 'string') {
    return photoLink;
  }
  return photoLink ? URL.createObjectURL(photoLink) : defaultAvatar;
};

export const CvDocument = ({ profile }: any) => {
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Image src={getProfilePhotoLink(profile.photoLink)} style={styles.avatar} />
        <View>
          <Text style={styles.header}>{`${profile.surname} ${profile.name}`}</Text>
          <Text>{profile.job_function.name}</Text>
          <Text style={styles.dimText}>{getExperienceText(profile.careerStartDate)}</Text>
        </View>
        <View style={styles.dimView}>
          <Text style={styles.title}>Характеристика</Text>
          <Text style={styles.smallText}>{profile.summary}</Text>
        </View>
        <View style={styles.row}>
          <Text>Основные компетенции: </Text>
          <Text style={styles.middleText}>
            {getMainSkills(profile.skills)
              .map((s) => s.technology.name)
              .join(', ')}
          </Text>
        </View>
        <View>
          <Text style={styles.title}>Нываки:</Text>
          {sortSkillsByLevels(profile.skills).map((s) => {
            return (
              <Text
                style={{ ...styles.smallText, ...styles.listItem }}
              >{`- ${s.technology.name}`}</Text>
            );
          })}
        </View>
        {profile.positions.length > 0 && (
          <View style={styles.dimView}>
            <Text style={styles.title}>Прошлые проекты:</Text>
            {profile.positions.map((p: any) => {
              return (
                <>
                  <Text style={styles.row}>
                    <Text style={styles.middleText}>{p.project.name}</Text>
                    <Text
                      style={{ ...styles.smallText, ...styles.listItem }}
                    >{` (${p.project.scopes.map(({ name }: any) => name).join(', ')}) - ${
                      p.project.description
                    }`}</Text>
                  </Text>
                  <Text style={styles.row}>
                    <Text style={styles.middleText}>Выполняемые задачи: </Text>
                    <Text style={styles.smallText}>
                      {p.duties.map(({ text }: any) => text).join(', ')}
                    </Text>
                  </Text>
                </>
              );
            })}
          </View>
        )}
        <View>
          <Text style={styles.title}>Контакты:</Text>
          <Text
            style={{ ...styles.smallText, ...styles.listItem }}
          >{`Email: ${profile.email}`}</Text>
        </View>
        {profile.education && (
          <View>
            <Text style={styles.title}>Образование</Text>
            <Text style={styles.smallText}>{profile.education}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};
