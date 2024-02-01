import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import { firebase } from '../config';

const NoteUpdate = ({ route, navigation }) => {
  const { noteId } = route.params || {};
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (noteId) {
      firebase
        .firestore()
        .collection('notes')
        .doc(noteId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const { title: existingTitle, note: existingNote } = doc.data();
            setTitle(existingTitle);
            setNote(existingNote);
          }
        })
        .catch((error) => {
          console.error('Error fetching note details:', error);
        });
    }
  }, [noteId]);

  const handleUpdateNote = () => {
    if (title.trim() !== '' && note.trim() !== '') {
      if (noteId) {
        firebase.firestore().collection('notes').doc(noteId).update({
          title: title,
          note: note,
        });
      } else {
        firebase.firestore().collection('notes').add({
          title: title,
          note: note,
        });
      }

      setTitle('');
      setNote('');

      navigation.goBack();
    }
  };

  return (
    <View>
      <TextInput
        placeholder={`Enter note title${noteId ? ` (Previous: ${title})` : ''}`}
        onChangeText={(text) => setTitle(text)}
        value={title}
      />
      <TextInput
        placeholder={`Enter your note here${noteId ? ` (Previous: ${note})` : ''}`}
        onChangeText={(text) => setNote(text)}
        value={note}
        multiline
      />
      <Button title="Save Note" onPress={handleUpdateNote} />
    </View>
  );
};

export default NoteUpdate;
