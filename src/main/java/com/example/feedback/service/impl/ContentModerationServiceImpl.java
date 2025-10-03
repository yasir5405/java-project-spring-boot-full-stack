package com.example.feedback.service.impl;

import com.example.feedback.exception.ContentModerationException;
import com.example.feedback.service.ContentModerationService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.regex.Pattern;

/**
 * Implementation of ContentModerationService that checks for inappropriate words.
 * Uses a configurable list of inappropriate words and performs case-insensitive matching.
 */
@Service
public class ContentModerationServiceImpl implements ContentModerationService {
    
    private final Set<String> inappropriateWords;
    
    public ContentModerationServiceImpl(
            @Value("${content.moderation.inappropriate-words:spam,abuse,hate,offensive,inappropriate,vulgar,profanity,harassment,threat,violence,discrimination,racist,sexist,homophobic,xenophobic,toxic,bully,cyberbully,troll,fake,scam,fraud,illegal,explicit,nsfw,adult,porn,drugs,weapons,gambling,suicide,self-harm}") 
            String inappropriateWordsConfig) {
        
        // Parse the comma-separated list of inappropriate words
        this.inappropriateWords = new HashSet<>();
        if (inappropriateWordsConfig != null && !inappropriateWordsConfig.trim().isEmpty()) {
            String[] words = inappropriateWordsConfig.split(",");
            for (String word : words) {
                String trimmedWord = word.trim().toLowerCase();
                if (!trimmedWord.isEmpty()) {
                    this.inappropriateWords.add(trimmedWord);
                }
            }
        }
    }
    
    @Override
    public void validateContent(String text, String operation) {
        if (text == null || text.trim().isEmpty()) {
            return; // Empty text is allowed
        }
        
        String detectedWord = getFirstInappropriateWord(text);
        if (detectedWord != null) {
            throw new ContentModerationException(
                String.format("Content contains inappropriate language. Operation '%s' blocked due to offensive content.", operation),
                detectedWord,
                operation
            );
        }
    }
    
    @Override
    public boolean containsInappropriateContent(String text) {
        return getFirstInappropriateWord(text) != null;
    }
    
    @Override
    public String getFirstInappropriateWord(String text) {
        if (text == null || text.trim().isEmpty()) {
            return null;
        }
        
        // Convert to lowercase for case-insensitive comparison
        String lowerText = text.toLowerCase();
        
        // Split text into words and check each word
        String[] words = lowerText.split("\\W+");
        for (String word : words) {
            if (!word.trim().isEmpty() && inappropriateWords.contains(word.trim())) {
                return word.trim();
            }
        }
        
        // Also check for words that might be part of larger strings (with word boundaries)
        for (String inappropriateWord : inappropriateWords) {
            Pattern pattern = Pattern.compile("\\b" + Pattern.quote(inappropriateWord) + "\\b", Pattern.CASE_INSENSITIVE);
            if (pattern.matcher(text).find()) {
                return inappropriateWord;
            }
        }
        
        return null;
    }
    
    /**
     * Get the current set of inappropriate words (for testing/debugging purposes).
     * 
     * @return set of inappropriate words
     */
    public Set<String> getInappropriateWords() {
        return new HashSet<>(inappropriateWords);
    }
}