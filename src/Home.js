import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { View, Text, Button } from 'react-native';
import {firebase} from '../config';
import { StyleSheet} from 'react-native';

const Home = () => {
    const [notes, setNotes] = useState([]);
    const navigation = useNavigation();
  
    useEffect(() => {
      const unsubscribe = firebase.firestore().collection('notes').onSnapshot((querySnapshot) => {
        const newNotes = [];
        querySnapshot.forEach((doc) => {
          const { title, note } = doc.data();
          newNotes.push({ title, note, id: doc.id });
        });
  
        setNotes(newNotes);
      });
  
      // Unsubscribe from the snapshot listener when the component unmounts
      return () => unsubscribe();
    }, []);
  
    const handleUpdateNote = (id) => {
      // Navigate to the NoteUpdate screen with the note ID
      navigation.navigate('NoteUpdate', { noteId: id });
    };
  
    const handleDeleteNote = (id) => {
      // Delete the note from Firebase Firestore
      firebase.firestore().collection('notes').doc(id).delete()
        .then(() => {
          console.log('Note deleted from Firestore successfully');
        })
        .catch((error) => {
          console.error('Error deleting note from Firestore:', error);
        });
    };
  
    return (
      <View style={styles.container}>
        {notes.map((note) => (
          <View key={note.id} style={styles.noteContainer}>
            <Text style={styles.noteTitle}>{note.title}</Text>
            <Text style={styles.noteText}>{note.note}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Update" onPress={() => handleUpdateNote(note.id)} />
              <Button title="Delete" onPress={() => handleDeleteNote(note.id)} />
            </View>
          </View>
        ))}
        <Button title="Add Note" onPress={() => navigation.navigate('NoteAdd')} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    noteContainer: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    noteTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    noteText: {
      fontSize: 16,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 8,
    },
  });
  
  export default Home;