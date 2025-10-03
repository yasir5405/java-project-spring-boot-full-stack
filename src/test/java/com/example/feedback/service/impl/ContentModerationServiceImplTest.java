package com.example.feedback.service.impl;

import com.example.feedback.exception.ContentModerationException;
import com.example.feedback.service.ContentModerationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ContentModerationServiceImplTest {

    private ContentModerationService contentModerationService;

    @BeforeEach
    void setUp() {
        // Initialize with a small set of test inappropriate words
        String testWords = "spam,abuse,hate,offensive,inappropriate";
        contentModerationService = new ContentModerationServiceImpl(testWords);
    }

    @Test
    void validateContent_WithCleanContent_ShouldNotThrowException() {
        // Arrange
        String cleanContent = "This is a perfectly normal feedback message about the product.";

        // Act & Assert
        assertDoesNotThrow(() -> {
            contentModerationService.validateContent(cleanContent, "create");
        });
    }

    @Test
    void validateContent_WithInappropriateContent_ShouldThrowException() {
        // Arrange
        String inappropriateContent = "This product is spam and offensive!";

        // Act & Assert
        ContentModerationException exception = assertThrows(ContentModerationException.class, () -> {
            contentModerationService.validateContent(inappropriateContent, "create");
        });
        
        assertTrue(exception.getMessage().contains("spam") || exception.getMessage().contains("offensive"));
    }

    @Test
    void containsInappropriateContent_WithCleanContent_ShouldReturnFalse() {
        // Arrange
        String cleanContent = "This is a perfectly normal feedback message.";

        // Act
        boolean containsInappropriate = contentModerationService.containsInappropriateContent(cleanContent);

        // Assert
        assertFalse(containsInappropriate);
    }

    @Test
    void containsInappropriateContent_WithInappropriateContent_ShouldReturnTrue() {
        // Arrange
        String inappropriateContent = "This is spam content";

        // Act
        boolean containsInappropriate = contentModerationService.containsInappropriateContent(inappropriateContent);

        // Assert
        assertTrue(containsInappropriate);
    }

    @Test
    void containsInappropriateContent_WithMixedCaseInappropriateContent_ShouldReturnTrue() {
        // Arrange
        String inappropriateContent = "This is SPAM content with OFFENSIVE language";

        // Act
        boolean containsInappropriate = contentModerationService.containsInappropriateContent(inappropriateContent);

        // Assert
        assertTrue(containsInappropriate);
    }

    @Test
    void getFirstInappropriateWord_WithCleanContent_ShouldReturnNull() {
        // Arrange
        String cleanContent = "This is a normal message about the product.";

        // Act
        String firstInappropriateWord = contentModerationService.getFirstInappropriateWord(cleanContent);

        // Assert
        assertNull(firstInappropriateWord);
    }

    @Test
    void getFirstInappropriateWord_WithInappropriateContent_ShouldReturnFirstWord() {
        // Arrange
        String inappropriateContent = "This spam message is also offensive";

        // Act
        String firstInappropriateWord = contentModerationService.getFirstInappropriateWord(inappropriateContent);

        // Assert
        assertNotNull(firstInappropriateWord);
        assertTrue(firstInappropriateWord.equals("spam") || firstInappropriateWord.equals("offensive"));
    }

    @Test
    void validateContent_WithEmptyContent_ShouldNotThrowException() {
        // Arrange
        String emptyContent = "";

        // Act & Assert
        assertDoesNotThrow(() -> {
            contentModerationService.validateContent(emptyContent, "create");
        });
    }

    @Test
    void validateContent_WithNullContent_ShouldNotThrowException() {
        // Act & Assert
        assertDoesNotThrow(() -> {
            contentModerationService.validateContent(null, "create");
        });
    }

    @Test
    void containsInappropriateContent_WithPartialWordMatch_ShouldNotReturnTrue() {
        // Arrange - words that contain inappropriate words but are legitimate
        String contentWithPartialWords = "I assess this classic product.";

        // Act
        boolean containsInappropriate = contentModerationService.containsInappropriateContent(contentWithPartialWords);

        // Assert
        assertFalse(containsInappropriate);
    }
}